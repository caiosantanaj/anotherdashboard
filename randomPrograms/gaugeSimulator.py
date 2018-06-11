import json
from random import randrange
import paho.mqtt.client as paho
import time
import _thread

# Define a function for the thread
def send():
    while True:
        time.sleep(1)
        msg = json.dumps({"name": "Wind sensor","type": "gauge", "max":25 , "min": 2, "data": {"value": randrange(10,22)}})
        print(msg)
        client1.publish("gauge", msg)

def on_publish(clinet, user, result):
    print("Published!")

# Define Variables
MQTT_HOST = "192.168.43.24"
MQTT_PORT = 1883
MQTT_TOPIC = "gauge"

client1 = paho.Client("client" + str(randrange(1,10000)))
client1.on_publish = on_publish
client1.connect(MQTT_HOST, MQTT_PORT)

_thread.start_new_thread(send())
