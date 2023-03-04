from django.db import models
import datetime
from django.utils.translation import gettext as _

# Create your models here.
class Accident(models.Model):
    latitude = models.DecimalField(default="0", decimal_places=12, max_digits=20)
    longitude = models.DecimalField(default="0", decimal_places=12, max_digits=20)
    date = models.DateField()
    time = models.TimeField(default="0:0:0")
    image = models.TextField(default="")

class PoliceStation(models.Model):
    latitude = models.DecimalField(default="0", decimal_places=12, max_digits=20)
    longitude = models.DecimalField(default="0", decimal_places=12, max_digits=20)
    contactNumber = models.TextField(default="0000000000")
    branch = models.TextField(default="")

    def __str__(self):
        return self.branch

class Hospital(models.Model):
    latitude = models.DecimalField(default="0", decimal_places=12, max_digits=20)
    longitude = models.DecimalField(default="0", decimal_places=12, max_digits=20)
    contactNumber=models.TextField(default="0000000000")
    name=models.TextField(default="")

    def __str__(self):
        return self.name

class Victim(models.Model):
    name=models.TextField(default="")
    contactNumber=models.TextField(default="0000000000")
    street=models.TextField(default="")
    city=models.TextField(default="")
    state=models.TextField(default="")

    def __str__(self):
        return self.name

class Car(models.Model):
    regNum=models.TextField(default="")
    color=models.TextField(default="")
    model=models.TextField(default="")
    brand=models.TextField(default="")
    owner = models.TextField(default="")

    def __str__(self):
        return self.regNum


class AccidentAlert(models.Model):
    accId=models.ForeignKey(Accident, null=True, on_delete= models.CASCADE)
    polId=models.ForeignKey(PoliceStation, null=True, on_delete= models.CASCADE)
    hosId=models.ForeignKey(Hospital, null=True, on_delete= models.CASCADE)
    polAttend = models.BooleanField(default=False)
    hosAttend = models.BooleanField(default=False)

class AccidentVictims(models.Model):
    accId = models.ForeignKey(Accident, on_delete=models.CASCADE)
    vicId = models.ForeignKey(Victim, on_delete=models.CASCADE)

class AccidentVehicles(models.Model):
    accId = models.ForeignKey(Accident, on_delete=models.CASCADE)
    vehId = models.ForeignKey(Car, on_delete=models.CASCADE)
