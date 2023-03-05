# Accident Detection and Assistance System 

Accident Detection and Assistance System detects accident from CCTV footage and alerts the emergency services(police and hospital). All the registered services can see the latest alerts and previous alerts. Registered services can add details of vehicle and victims involved in the accident. The frontend of the application is made using React and backend is made using Django.

## Architecture of the project

The diagram explains the architecture of the project. We get CCTV footage and convert it to frames and feed it to VGG16 Model for detection. If accident is detected, nearest police station and hospital is found. Then alerts are sent to these services and they can update the details of victim and vehicles involved in the accident.
