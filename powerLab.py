from machine import Pin

class POWERlab:
    def __init__(self, pin):
        self.pwr1 = Pin(pin, Pin.OUT)

    def onPower(self):
        print("Power On")
        self.pwr1.value(1)

    def offPower(self):
        print("Power Off")
        self.pwr1.value(0)

    def cleanUp(self):
        print('Cleaning up pins')
