import json
from random import randrange
import paho.mqtt.client as paho
import time
import _thread

def randomValue():
    n = randrange(1,4)

    if(n == 1):
        return "Kitchen"
    elif(n == 2):
        return "Room"
    else:
        return "Bathroom"

# Define a function for the thread
def send():
    while True:
        time.sleep(1)
        msg = json.dumps({"name": "Noise Simulator", "type": "pie", "data": {"label": randomValue(),"value": randrange(3,100)}})
        print(msg)
        client1.publish("pie", msg)

def on_publish(clinet, user, result):
    print("Published!")

# Define Variables
MQTT_HOST = "192.168.1.64"
MQTT_PORT = 1883
MQTT_TOPIC = "pie"

client1 = paho.Client("client" + str(randrange(1,10000)))
client1.on_publish = on_publish
client1.connect(MQTT_HOST, MQTT_PORT)

_thread.start_new_thread(send())
