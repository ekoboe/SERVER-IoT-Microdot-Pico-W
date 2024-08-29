from microdot_asyncio import Microdot, Response, send_file
from microdot_utemplate import render_template
from microdot_asyncio_websocket import with_websocket
from bme_module import BME280Module
from ssd1306 import SSD1306_I2C
from powerLab import POWERlab
from machine import Pin, I2C, ADC
import ujson
import random
import time
from boot import do_connect

ip= do_connect()
print('Get IP :', ip)

ldr = ADC(Pin(26))

sda = Pin(0)
scl = Pin(1)
i2c = I2C(0, scl=Pin(1), sda=Pin(0), freq=400000)

bme_module = BME280Module(0, scl, sda)
display = SSD1306_I2C(128, 64, i2c)

app = Microdot()
Response.default_content_type = 'text/html'

l1 = POWERlab(15)
l2 = POWERlab(16)
l3 = POWERlab(17)
bz = POWERlab(8)

l1.offPower()
l2.offPower()
l3.offPower()
bz.offPower()

def update_display(temp, hum, press, alt, co, status):
    try:
        display.fill(0)  # Clear the display
        display.hline(0, 0, 127, 1) #atas monitoring
        display.hline(0, 12, 127, 1) #bawah monitoring
        display.hline(0, 25, 127, 1) #atas status
        display.hline(0, 37, 127, 1) #bawah status
        display.hline(0, 63, 127, 1) #bawah ip
        display.hline(0, 53, 127, 1) #line atas ip
        display.vline(0, 0, 65, 1) #status kiri
        display.vline(127, 0, 65, 1) #status kanan
        display.fill_rect(0, 37, 5, 30, 1) # border kiri
        display.fill_rect(123, 37, 5, 30, 1) #border kanan
        display.text('Monitoring', 23, 3)
        display.text(f'T:{temp:.0f}C',0, 15)
        display.text(f'Co:{co:.1f} PM', 45, 15)
        display.text(f'Status',43, 28)
        display.text(f'{status}',14, 42)
        display.text(f'{ip}', 10, 55)
        display.show()
    except Exception as e:
        print("Error updating display:", e)
   
@app.route('/')
async def index(request): 
    return render_template('index.html')

@app.route('/updateData')
async def get_sensor_data(request):
    print("Receive get data request!")
    ip= do_connect()
    sensor_reads_temp, sensor_reads_press, sensor_reads_hum, sensor_reads_alt = bme_module.get_sensor_readings()
    raw_value = ldr.read_u16()
    co = round((raw_value * 3.3 / 65535) * 100,2)
    print('CO:', co)

    if co <= 50:
        status = "Baik"
    elif co <=100:
        status = "Sedang"
    elif co <= 199:
        status = "Tidak Sehat"
    elif co <= 299:
        status = "Sgt Tdk Sehat"
    else:
        status="Berbahaya"
  
    update_display(sensor_reads_temp, sensor_reads_hum, sensor_reads_press, sensor_reads_alt, co, status)
    
    return ujson.dumps({
        "readingTemp": sensor_reads_temp, 
        "readingHum": sensor_reads_hum, 
        "readingPress": sensor_reads_press, 
        "readingAlt": sensor_reads_alt, 
        "readingCO": co,
        "ip":ip
    })

@app.route("/ws")
@with_websocket
async def kontrolButton(request, ws):
    while True:
        data = await ws.receive()
        print(data)
        if data == 'on1':
            l1.onPower()
        if data == 'off1':          
          l1.offPower()
          
        if data == 'on2':
            l2.onPower()
        if data == 'off2':
            l2.offPower()

        if data == 'on3':
            l3.onPower()
        if data == 'off3':
            l3.offPower()
            
        if data == 'on4':
            bz.onPower()
        if data == 'off4':
            bz.offPower()
            
        await ws.send("OK")

@app.route('/shutdown')
async def shutdown(request):
    request.app.shutdown()
    return 'The server is shutting down...'

@app.route('/static/<path:path>')
def static(request, path):
    if '..' in path:
        # directory traversal is not allowed
        return 'Not found', 404
    return send_file('static/' + path)

if __name__ == "__main__":
    try:
        app.run(debug = True, host='192.168.64.67')
    except KeyboardInterrupt:
        pass