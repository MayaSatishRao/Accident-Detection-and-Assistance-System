from rest_framework.serializers import ModelSerializer
from .models import Accident, Hospital, PoliceStation, AccidentAlert

class AccidentSerializer(ModelSerializer):
    class Meta: 
      model = Accident
      fields="__all__"

class HospitalSerializer(ModelSerializer):
     class Meta:
        model=Hospital
        fields = ["name"]

class PoliceSerializer(ModelSerializer):
    class Meta:
        model = PoliceStation
        fields= ["branch"]

