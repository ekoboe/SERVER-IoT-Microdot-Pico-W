from machine import Pin, I2C
from bme_module import BME280Module
from utime import sleep

sda = Pin(0)
scl = Pin(1)
bme_module = BME280Module(0, scl, sda)
while True:  
    temp, pressure,humdt, altitude = bme_module.get_sensor_readings()
    
    print("============================")
    print("     SENSOR BME-280         ")
    print("----------------------------")
    print("Suhu         : ",temp)
    print("Tekanan Udara: ",pressure)
    print("Kelembahan   : ",humdt)
    print("Ketinggian   : ",altitude)
    print("----------------------------")
    
    sleep(1)


