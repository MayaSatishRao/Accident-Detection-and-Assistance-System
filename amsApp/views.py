from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Accident, Hospital, PoliceStation, AccidentAlert, AccidentVehicles, AccidentVictims, Victim, Car
from .serializers import AccidentSerializer, PoliceSerializer, HospitalSerializer
from .authenticate import authenticate
from django.contrib.auth.models import User
from datetime import date, datetime
from math import sin, cos, asin , sqrt, pi, radians
from pymongo import MongoClient
import gridfs
from bson.objectid import ObjectId
import os, shutil

# Create your views here.

#function to calculate distance between two points given their coordinates
def distance(lat1, lon1, lat2, lon2):
     
    # The math module contains a function named
    # radians which converts from degrees to radians.
    lon1 = radians(lon1)
    lon2 = radians(lon2)
    lat1 = radians(lat1)
    lat2 = radians(lat2)
      
    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
 
    c = 2 * asin(sqrt(a))
    
    # Radius of earth in kilometers. Use 3956 for miles
    r = 6371
      
    # calculate the result
    print("distance is ",(c*r))
    return(c * r)


#querying the police station and hospital database to find nearest one
def getNearestHospital(lat1, lon1):
    h = Hospital.objects.raw("SELECT id, latitude, longitude FROM amsApp_Hospital")
    minDistance=100000
    alertHos = None
    for hos in h:
      d = distance(lat1, lon1,hos.latitude,hos.longitude)
      if(minDistance>d):
         minDistance=d
         alertHos=hos
    return alertHos

def getNearestPolice(lat1, lon1):
    p = PoliceStation.objects.raw("SELECT id, latitude, longitude FROM amsApp_Hospital")
    minDistance = 1000000
    alertPos = None
    for pol in p:
        d = distance(lat1,lon1,pol.latitude,pol.longitude)
        if(minDistance>d):
            minDistance=d
            alertPos = pol
    
    return alertPos



#function to store image in frontend folder
def storeImage(imageId):
     print("Image id is ",imageId)
     client = MongoClient()
     db = client.accidentImages
     fs = gridfs.GridFS(db)

     imageData = fs.get(imageId).read()
     output = open("./amsFrontend/src/assets/accImage.jpg","wb")
     output.write(imageData)
     output.close()


#### rest api to fetch data from databse ###

#post request to add accident entry
@api_view(['POST'])
def createAccident(request):
  
  try:
        lat1 = float(request.data["latitude"])
        lon1 = float(request.data["longitude"])
        img = request.data["image"]
        acc = Accident(latitude=lat1, longitude = lon1, image=img, date= date.today(), time=datetime.now())
        acc.save()

        p = getNearestPolice(lat1,lon1)
        h = getNearestHospital(lat1,lon1)
        accAlert = AccidentAlert(accId=acc,polAttend=False, hosAttend=False,polId=p,hosId=h)
        accAlert.save()
        print(accAlert)
        return Response("success")
  except Exception as e:
        print(e)
        return Response("failure")
    
 


#post request for the user to login
@api_view(['POST'])
def login(request):
    username = request.data["username"]
    password = request.data["password"]
    
    try:
      user = User.objects.get(username=username)
      if user is None:
          return Response({"success":"false"})
      if(authenticate(username,password)):
          return Response({"success":"true","username":username})
      else:
          return Response({"success":"false"})
    except:
        return Response({"success":"false"})

#get individual hospital and police station entry
@api_view(['GET'])
def getHospital(request,id):
     hos = Hospital.objects.get(id=id)
     hosSer = HospitalSerializer(hos,many=False)
     return Response(hosSer.data)

@api_view(['GET'])
def getPolice(request,id):
     pol = PoliceStation.objects.get(id=id)
     polSer = PoliceSerializer(pol,many=False)
     return Response(polSer.data)


#get all accident entries
@api_view(['GET'])
def getAccidents(request):
     accs = Accident.objects.all()
     accSer = AccidentSerializer(accs,many=True)
     return Response(accSer.data)

#get individual accident entry given the id
@api_view(['GET'])
def getAccident(request,id):
    acc = Accident.objects.get(id=id)
    accSer = AccidentSerializer(acc,many=False)
    return Response(accSer.data)

#get all the accident alert entries
@api_view(['GET'])
def getAccidentAlerts(request):
    accAlerts = AccidentAlert.objects.all()
    result = []
    for accs in accAlerts:
        p = PoliceStation.objects.get(id=accs.polId.id)
        h = Hospital.objects.get(id=accs.hosId.id)
        a = Accident.objects.get(id=accs.accId.id)
        obj = {
            "latitude":a.latitude,
            "longitude":a.longitude,
            "police":p.branch,
            "hospital":h.name,
            "time":a.time,
            "date":a.date,
            "accId":a.id,
            "hosAttend":accs.hosAttend,
            "polAttend":accs.polAttend,
        }
        result.append(obj)

    return Response(result)

#get all alerts made to a hospital 
@api_view(['GET'])
def getHospitalAlerts(request,id):
    accAlerts = AccidentAlert.objects.filter(hosId=id)
    result = []
    for accs in accAlerts:
        p = PoliceStation.objects.get(id=accs.polId.id)
        a = Accident.objects.get(id=accs.accId.id)
        obj = {
            "latitude":a.latitude,
            "longitude":a.longitude,
            "police":p.branch,
            "time":a.time,
            "date":a.date,
            "accId":a.id,
            "hosAttend":accs.hosAttend,
        }
        result.append(obj)

    return Response(result)

#get all alerts made to police station
@api_view(['GET'])
def getPoliceAlerts(request,id):
    accAlerts = AccidentAlert.objects.filter(polId=id)
    result = []
    for accs in accAlerts:
        h = Hospital.objects.get(id=accs.hosId.id)
        a = Accident.objects.get(id=accs.accId.id)
        obj = {
            "latitude":a.latitude,
            "longitude":a.longitude,
            "time":a.time,
            "date":a.date,
            "accId":a.id,
            "polAttend":accs.polAttend,
            "hospital":h.name,
        }
        result.append(obj)

    return Response(result)

#get all the victims of a given accident
@api_view(['GET'])
def getAccidentVictims(request,id):
    entries = AccidentVictims.objects.filter(accId=id)
    victims = []
    storeImage(ObjectId(Accident.objects.get(id=id).image))
    for entry in entries:
            v = Victim.objects.get(id = entry.vicId.id)
            obj = {
                "name":v.name,
                "phone":v.contactNumber,
                "street":v.street,
                "city":v.city,
                "state":v.state
            }
            victims.append(obj)
    return Response(victims)

#update hasAttend attribute of an alert by police station and hospital
@api_view(['GET'])
def setPolAttend(request,id):
    p = AccidentAlert.objects.get(accId = id)
    try:
      p.polAttend = True
      p.save()
      return Response("success")
    except:
        return Response("failure")

@api_view(['GET'])
def setHosAttend(request,id):
    p = AccidentAlert.objects.get(accId = id)
    try:
      p.hosAttend = True
      p.save()
      return Response("success")
    except:
        return Response("failure")

#get vehicles involved in a particular accident
@api_view(['GET'])
def getAccidentVehicles(request,id):
    entries = AccidentVehicles.objects.filter(accId=id)
    vehs = []
    for entry in entries:
            v = Car.objects.get(id = entry.vehId.id)
            obj = {
                "regNum":v.regNum,
                "color":v.color,
                "model":v.model,
                "brand":v.brand,
                "owner":v.owner,
            }
            vehs.append(obj)
    return Response(vehs)

#post request to add victims involved in accident
@api_view(['POST'])
def setAccidentVictims(request):
    

    try:
       newVic = Victim()
       newVic.name = request.data['name']
       newVic.contactNumber= request.data['phone']
       newVic.street = request.data['street']
       newVic.state = request.data['state']
       newVic.city = request.data['city']

       newVic.save()
      
         
       newAccVic = AccidentVictims()
       newAccVic.vicId = newVic
       newAccVic.accId = Accident.objects.get(id = request.data['accId'])
       newAccVic.save()
       return Response("success")
    except Exception as e:
         print(e)
         return Response("failure")

#post request to add vehicles involved in accident
@api_view(['POST'])
def setAccidentVehicles(request):
    

    try:
       newVic = Car()
       newVic.regNum = request.data['regNum']
       newVic.brand= request.data['brand']
       newVic.color = request.data['color']
       newVic.owner = request.data['owner']
       newVic.model = request.data['model']

       newVic.save()
       print(request.data)
         
       newAccVic = AccidentVehicles()
       newAccVic.vehId = newVic
       newAccVic.accId = Accident.objects.get(id = request.data['accId'])
       newAccVic.save()
       return Response("success")
    except Exception as e:
         print(e)
         return Response("failure")





