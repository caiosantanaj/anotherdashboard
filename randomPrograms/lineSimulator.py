import json
from random import randrange
import paho.mqtt.client as paho
import time
import _thread

# Define a function for the thread
def send():
    while True:
        time.sleep(1)
        msg = json.dumps({"name": "My house temp.","type": "value", "data": {"value": randrange(19,23)}})
        #msg = json.dumps({"x": randrange(3,38)})
        print(msg)
        client1.publish("line", msg)

def on_publish(clinet, user, result):
    print("Published!")

# Define Variables
MQTT_HOST = "192.168.43.64"
MQTT_PORT = 1883
MQTT_TOPIC = "line"

client1 = paho.Client("client" + str(randrange(1,10000)))
client1.on_publish = on_publish
client1.connect(MQTT_HOST, MQTT_PORT)

_thread.start_new_thread(send())
