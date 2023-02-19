
from unicodedata import name
from django.urls import path

from apps.zona.views.zona import ZonaListView ,ZonaCreateView,ZonaUpdateView, ZonaDetalleView


app_name = 'zona'
urlpatterns = [
    path('zonalista/', ZonaListView.as_view(), name='zona'),
    path('formulario/', ZonaCreateView.as_view(), name='formulario'),
    path('editar/<int:pk>/', ZonaUpdateView.as_view(), name='zona-editar'),
    path('detalle/<int:pk>/', ZonaDetalleView.as_view(), name='zona-detalle' )
]   
