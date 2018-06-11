import json
from random import randrange
import paho.mqtt.client as paho
import time
import _thread

def randomValue():
    n = randrange(1,4)

    if(n == 1):
        return "a"
    elif(n == 2):
        return "b"
    else:
        return "c"

# Define a function for the thread
def send():
    while True:
        time.sleep(1)
        msg = json.dumps({"name": "Bubble Simulator","type": "bubble", "data": {"label": randomValue(), "values": {"x": randrange(1,20), "y":randrange(1,20), "r":randrange(2,12)}}})
        print(msg)
        client1.publish("bubble", msg)

def on_publish(clinet, user, result):
    print("Published!")

# Define Variables
MQTT_HOST = "192.168.1.64"
MQTT_PORT = 1883
MQTT_TOPIC = "bubble"

client1 = paho.Client("client" + str(str(randrange(1,10000))))
client1.on_publish = on_publish
client1.connect(MQTT_HOST, MQTT_PORT)

_thread.start_new_thread(send())
