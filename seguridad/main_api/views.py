from django.http.response import JsonResponse
from .models import EventoSocial, FalloCamara, SolicitudVideoCamaras, Bicicleta, PaseSalida, ActaAdministrativa, Users, Incidencias, Vistas, RomperCandado, HojaUrgencias, CredencialPerdida, ReporteIncidentesMatPel
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
import pandas as pd
from .serializers import ActaAdministrativaSerializer, BicicletaSerializer, IncidenciasSerializer, PaseSalidaSerializer, SolicitudCamSerializer, EventoSocialSerializer,FalloCamaraSerializer, UsersSerializer, VistasSerializer, RomperCandadoSerializer, HojaUrgenciasSerializer, CredencialPerdidaSerializer, ReporteIncidentesMatPelSerializer
# Create your views here.

class SolicitudCam(generics.ListCreateAPIView):
    queryset = SolicitudVideoCamaras.objects.all()
    serializer_class = SolicitudCamSerializer

class SolicitudCamDetail(generics.RetrieveDestroyAPIView):
    queryset = SolicitudVideoCamaras.objects.all()
    serializer_class = SolicitudCamSerializer
    
class BicicletaList(generics.ListCreateAPIView):
    queryset = Bicicleta.objects.all()
    serializer_class = BicicletaSerializer

class BicicletaDetail(generics.RetrieveDestroyAPIView):
    queryset = Bicicleta.objects.all()
    serializer_class = BicicletaSerializer

class EventoSocialList(generics.ListCreateAPIView):
    queryset = EventoSocial.objects.all()
    serializer_class = EventoSocialSerializer
    
class EventoSocialDetail(generics.RetrieveDestroyAPIView):
    queryset = EventoSocial.objects.all()
    serializer_class = EventoSocialSerializer
    
class FalloCamaraList(generics.ListCreateAPIView):
    queryset = FalloCamara.objects.all()
    serializer_class = FalloCamaraSerializer
    
class FalloCamaraDetail(generics.RetrieveDestroyAPIView):
    queryset = FalloCamara.objects.all()
    serializer_class = FalloCamaraSerializer
    
class PaseSalidaList(generics.ListCreateAPIView):
    queryset = PaseSalida.objects.all()
    serializer_class = PaseSalidaSerializer

class PaseSalidaDetail(generics.RetrieveDestroyAPIView):
    queryset = PaseSalida.objects.all()
    serializer_class = PaseSalidaSerializer

class ActaAdministrativaList(generics.ListCreateAPIView):
    queryset = ActaAdministrativa.objects.all()
    serializer_class = ActaAdministrativaSerializer

class ActaAdministrativaDetail(generics.RetrieveDestroyAPIView):
    queryset = ActaAdministrativa.objects.all()
    serializer_class = ActaAdministrativaSerializer

class UsersList(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class UsersDetail(generics.RetrieveDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class IncidenciasList(generics.ListCreateAPIView):
    queryset = Incidencias.objects.all()
    serializer_class = IncidenciasSerializer

class IncidenciasDetail(generics.RetrieveDestroyAPIView):
    queryset = Incidencias.objects.all()
    serializer_class = IncidenciasSerializer

class VistasList(generics.ListCreateAPIView):
    queryset = Vistas.objects.all()
    serializer_class = VistasSerializer

class VistasDetail(generics.RetrieveDestroyAPIView):
    queryset = Vistas.objects.all()
    serializer_class = VistasSerializer

class RomperCandadoList(generics.ListCreateAPIView):
    queryset = RomperCandado.objects.all()
    serializer_class = RomperCandadoSerializer

class RomperCandadoDetail(generics.RetrieveDestroyAPIView):
    queryset = RomperCandado.objects.all()
    serializer_class = RomperCandadoSerializer

class HojaUrgenciasList(generics.ListCreateAPIView):
    queryset = HojaUrgencias.objects.all()
    serializer_class = HojaUrgenciasSerializer

class HojaUrgenciasDetail(generics.RetrieveDestroyAPIView):
    queryset = HojaUrgencias.objects.all()
    serializer_class = HojaUrgenciasSerializer

class CredencialPerdidaList(generics.ListCreateAPIView):
    queryset = CredencialPerdida.objects.all()
    serializer_class = CredencialPerdidaSerializer

class CredencialPerdidaDetail(generics.RetrieveDestroyAPIView):
    queryset = CredencialPerdida.objects.all()
    serializer_class = CredencialPerdidaSerializer

class ReporteIncidentesMatPelList(generics.ListCreateAPIView):
    queryset = ReporteIncidentesMatPel.objects.all()
    serializer_class = ReporteIncidentesMatPelSerializer

class ReporteIncidentesMatPelDetail(generics.RetrieveDestroyAPIView):
    queryset = ReporteIncidentesMatPel.objects.all()
    serializer_class = ReporteIncidentesMatPelSerializer

def AutoRegresion(request):
    incidencias = Incidencias.objects.get_queryset()
    serializer = IncidenciasSerializer(incidencias, many=True)
    df = pd.DataFrame(serializer.data)
    print(df)
    resolve = df.to_json()
    return JsonResponse(resolve, safe=False)

def index(request):
    return HttpResponse("Hello, world. You're at the main_api index.")