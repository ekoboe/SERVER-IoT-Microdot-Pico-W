from machine import Pin, I2C
from bme_module import BME280Module
from ssd1306 import SSD1306_I2C
from utime import sleep

i2c=I2C(0, sda=Pin(0), scl=Pin(1), freq=400000)

sda = Pin(0)
scl = Pin(1)

bme_module = BME280Module(0, scl, sda)
display = SSD1306_I2C(128, 64, i2c)

while True:  
    temp, pressure,humdt, altitude = bme_module.get_sensor_readings()
  
    display.fill(0)    
    display.text('MONITORING',23, 3, 1)
    display.text('Temp   :',0, 18, 1)
    display.text(str(temp),63, 18, 1)
    display.text('Press  :',0, 28, 1)
    display.text(str(pressure),63, 28, 1)
    display.text('Humdt  :',0, 43, 1)
    display.text(str(humdt),63, 43, 1)
    display.text('Alttd  :',0, 53, 1)
    display.text(str(altitude),63, 53, 1)
    display.hline(0, 63, 127, 1)
    display.hline(0, 0, 127, 1)
    display.hline(0, 14, 127, 1)
    display.vline(0, 0, 63, 1)
    display.vline(127, 0, 63, 1)
    display.show()
            
    sleep(1)


