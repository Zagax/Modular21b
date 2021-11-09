from django.urls import path

from .views import ActaAdministrativaDetail, ActaAdministrativaList, AutoRegresion, BicicletaDetail, BicicletaList, EventoSocialDetail, EventoSocialList, FalloCamaraDetail, FalloCamaraList, IncidenciasDetail, IncidenciasList, PaseSalidaDetail, PaseSalidaList, SolicitudCamDetail,SolicitudCam,UsersDetail, UsersList, VistasDetail, VistasList, RomperCandadoDetail, RomperCandadoList, HojaUrgenciasDetail, HojaUrgenciasList, CredencialPerdidaDetail, CredencialPerdidaList, ReporteIncidentesMatPelList, ReporteIncidentesMatPelDetail
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('solcamara', SolicitudCam.as_view(), name='Camaralistcreate'),
    path('solcamara/<int:pk>/', SolicitudCamDetail.as_view(), name='Camaradetailcreate'),
    path('bicicleta', BicicletaList.as_view(), name='listBicicletacreate'),
    path('bicicleta/<int:pk>/', BicicletaDetail.as_view(), name='Bicicletadetailcreate'),
    path('social', EventoSocialList.as_view(), name='listsocialcreate'),
    path('social/<int:pk>/', EventoSocialDetail.as_view(), name='Bicicletasocialcreate'),
    path('camara', FalloCamaraList.as_view(), name='listCamaracreate'),
    path('camara/<int:pk>/', FalloCamaraDetail.as_view(), name='Camaradetailcreate'),
    path('pasesalida', PaseSalidaList.as_view(), name='listPaseSalidacreate'),
    path('pasesalida/<int:pk>/', PaseSalidaDetail.as_view(), name='PaseSalidadetailcreate'),
    path('actaadministrativa', ActaAdministrativaList.as_view(), name='ActaAdministrativalistcreate'),
    path('actaadministrativa/<int:pk>/', ActaAdministrativaDetail.as_view(), name='ActaAdministrativadetailcreate'),
    path('users', UsersList.as_view(), name='Userslistcreate'),
    path('users/<int:pk>/', UsersDetail.as_view(), name='Usersdetailcreate'),
    path('incidencias', IncidenciasList.as_view(), name='Incidenciaslistcreate'),
    path('incidencias/<int:pk>/', IncidenciasDetail.as_view(), name='Incidenciasdetailcreate'),
    path('vistas', VistasList.as_view(), name='Vistaslistcreate'),
    path('vistas/<int:pk>/', VistasDetail.as_view(), name='Vistasdetailcreate'),
    path('rompercandado', RomperCandadoList.as_view(), name='RomperCandadolistcreate'),
    path('rompercandado/<int:pk>/', RomperCandadoDetail.as_view(), name='RomperCandadodetailcreate'),
    path('hojaurgencias', HojaUrgenciasList.as_view(), name='HojaUrgenciaslistcreate'),
    path('hojaurgencias/<int:pk>/', HojaUrgenciasDetail.as_view(), name='HojaUrgenciasdetailcreate'),
    path('credencialperdida', CredencialPerdidaList.as_view(), name='CredencialPerdidalistcreate'),
    path('credencialperdida/<int:pk>/', CredencialPerdidaDetail.as_view(), name='CredencialPerdidadetailcreate'),
    path('reporteincidentesmatpel', ReporteIncidentesMatPelList.as_view(), name='ReporteIncidentesMatPellistcreate'),
    path('reporteincidentesmatpel/<int:pk>/', ReporteIncidentesMatPelDetail.as_view(), name='ReporteIncidentesMatPeldetailcreate'),
    path('regresion', AutoRegresion, name='AutoRegresion')
    
]
if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)