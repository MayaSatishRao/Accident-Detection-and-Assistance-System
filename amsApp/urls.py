from django.urls import path
from . import views
urlpatterns = [
    path("login/",views.login,name="Login"),
    path("accidents/",views.getAccidents, name="getAccidents"),
    path("accident/<str:id>/",views.getAccident, name="getAccident"),
    path("hospital/<str:id>/",views.getHospital, name="getHospital"),
    path("police/<str:id>/",views.getPolice, name="getPolice"),
    path("accalerts/",views.getAccidentAlerts, name="accidentalerts"),
    path("accvictims/<str:id>/",views.getAccidentVictims,name="AccidentVictims"),
    path("accvehicles/<str:id>/",views.getAccidentVehicles,name="AccidentVehicles"),
    path("policealerts/<str:id>/",views.getPoliceAlerts, name='PoliceAlerts'),
    path("hospitalalerts/<str:id>/",views.getHospitalAlerts, name="HospitalAlerts"),
    path("polattend/<str:id>/",views.setPolAttend),
    path("hosattend/<str:id>/",views.setHosAttend),
    path("addvictims/",views.setAccidentVictims),
    path("addvehicles/",views.setAccidentVehicles),
    path("createaccident/", views.createAccident,),
]