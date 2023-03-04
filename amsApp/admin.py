from django.contrib import admin

# Register your models here.
from .models import Accident,Victim,PoliceStation, Hospital, Car, AccidentAlert, AccidentVehicles, AccidentVictims

admin.site.register(Accident)
admin.site.register(Victim)
admin.site.register(PoliceStation)
admin.site.register(Hospital)
admin.site.register(Car)
admin.site.register(AccidentAlert)
admin.site.register(AccidentVictims)
admin.site.register(AccidentVehicles)

