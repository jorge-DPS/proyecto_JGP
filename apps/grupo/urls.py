from django.urls import path
from django.views.generic.base import TemplateView
from apps.grupo.views.grupo import (GrupoListView, GrupoCreateView, GrupoUpdateView, GrupoSolidarioDetailView)

app_name = 'grupo'
urlpatterns = [
    path(
        'grupo/',
        GrupoListView.as_view(),
        name="lista_grupo"
    ),

    path(
        'grupo/crear',
        GrupoCreateView.as_view(),
        name="crear_grupo"
    ),

    path(
        'grupo_editar/<int:pk>',
        GrupoUpdateView.as_view(),
        name="editar_grupo"
    ),

    path(
        'grupo/detalle/<int:pk>',
        GrupoSolidarioDetailView.as_view(),
        name="detalle_grupo"
    )
]    
