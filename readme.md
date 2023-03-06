# Accident Detection and Assistance System 

Accident Detection and Assistance System detects accident from CCTV footage and alerts the emergency services(police and hospital). All the registered services can see the latest alerts and previous alerts. Registered services can add details of vehicle and victims involved in the accident. The frontend of the application is made using React and backend is made using Django.

## Architecture of the project

The diagram explains the architecture of the project. We get CCTV footage and convert it to frames and feed it to VGG16 Model for detection. If accident is detected, nearest police station and hospital is found. Then alerts are sent to these services and they can update the details of victim and vehicles involved in the accident.

![Login](https://github.com/MayaSatishRao/Accident-Detection-and-Assistance-System/blob/master/project_architecture.png)

# Frontend of the web application

The application is built using React. To install all dependencies, go to amsFrontend folder and run
```bash 
npm install 
```
To run the development server, run 
```bash 
npm start 
```
# Backend of the web application

The backend is built using Django. To install al the required packages run 
```bash
pip install -r requirements.txt
```
To run the backend server, run
```bash
python manage.py runserver
```
To access the SQLLite database create a new superuser by running this command,
```bash
python manage.py createsuperuser
```
Accident detected frame is store in MongoDB. This is required for AccidentInfo component and the image is stored in accidentImages database.To run MongoDB install MongoDB on your system and run
```bash
mongod
```
and in another terminal run 
```bash
mongosh
```
Create a new databse called accidentImages by running the command
```bash
use accidentImages
```
# Machine Learning Model
The machine learning model can be found in this repository. Link: https://github.com/MayaSatishRao/accident-detection-using-machine-learning. Instructions to run the model are given in that repository.
