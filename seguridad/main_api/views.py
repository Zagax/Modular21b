from datetime import time
from django.http.response import JsonResponse
from numpy.lib.npyio import load
from .models import EventoSocial, FalloCamara, SolicitudVideoCamaras, Bicicleta, PaseSalida, ActaAdministrativa, Users, Incidencias, Vistas, RomperCandado, HojaUrgencias, CredencialPerdida, ReporteIncidentesMatPel
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
import pandas as pd
from .serializers import ActaAdministrativaSerializer, BicicletaSerializer, IncidenciasSerializer, PaseSalidaSerializer, SolicitudCamSerializer, EventoSocialSerializer,FalloCamaraSerializer, UsersSerializer, VistasSerializer, RomperCandadoSerializer, HojaUrgenciasSerializer, CredencialPerdidaSerializer, ReporteIncidentesMatPelSerializer
# Create your views here.
import numpy as np
from numpy.linalg import inv 
import matplotlib.pyplot as plt
import statsmodels.api as sm
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_pacf
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from statsmodels.tsa.arima_model import ARIMA
import json


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
    datos = df[["FechaHora"]].copy()
    datos["FechaHora"] = datos["FechaHora"].str.slice(stop=10)
    datos = datos.assign(Times=0)
    aux = datos.groupby(['FechaHora']).size().reset_index(name='Times')
    aux.shape

    X = aux["Times"].values

    aux["Values_shifted"] = aux["Times"].shift()
    aux.drop("FechaHora",axis= 1, inplace=True)
    aux.dropna(inplace=True)

    y = aux.Times.values
    X = aux.Values_shifted.values

    train_size = int(len(X) * 0.80)

    X_train, X_test = X[0:train_size], X[train_size:len(X)]
    y_train, y_test = y[0:train_size], y[train_size:len(X)]
    
    X_train = X_train.reshape(-1,1)
    X_test = X_test.reshape(-1,1)

    lr = LinearRegression()
    lr.fit(X_train, y_train)

    y_pred = lr.predict(X_test)

    plt.plot(y_test[-500:], label="Actual Values")
    plt.plot(y_pred[-500:], label="Predicted Values")
    plt.legend()
    plt.show()
    plt.savefig('Grafica.png')

    regresion = pd.DataFrame()
    regresion["Actual Values"] = y_test[-10:]
    regresion["Predicted Values"] = y_pred[-10:]
    print(datos)
    resolve = regresion.to_json()
    return JsonResponse(resolve, safe=False)

def RegresionLineal(request):
    incidencias = Incidencias.objects.get_queryset()
    serializer = IncidenciasSerializer(incidencias, many=True)
    df = pd.DataFrame(serializer.data)
    datos = df[["FechaHora"]].copy()
    datos["FechaHora"] = datos["FechaHora"].str.slice(stop=10)
    datos = datos.assign(Times=0)
    aux = datos.groupby(['FechaHora']).size().reset_index(name='Times')
    x = aux["Times"].index
    c = aux["Times"]
    Lista=list(c)
    for i in range(len(Lista)):
        if i>0:
            Lista[i]=Lista[i]+Lista[i-1]
    c = Lista
    X = np.array([np.ones(len(x)), x]).T
    a = inv(X.T @ X) @ X.T @ c    ### Fórmula para minimizar los cuadrados
    #Predicción
    x_predict = np.linspace(0, 900, num=100)
    times_predict = a[0] + a[1] * x_predict
    #Graficamos
    plt.scatter(x, c)
    plt.xlabel('Días'); plt.ylabel('Incidencias'); plt.plot(x_predict, times_predict, 'c')
    plt.legend()
    plt.show()
    plt.savefig('GraficaLineal.png')
    #Dias a predecir
    y = a[1]*(900)+a[0]
    # y = y-Lista[len(Lista-1)]
    y1 = f"{y:.1f}"
    Total = { "Total del proximo año": y1}
    
    return JsonResponse(Total, safe=False)

def index(request):
    return HttpResponse("Hello, world. You're at the main_api index.")