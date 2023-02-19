from django.urls import path
from django.views.generic.base import TemplateView
from apps.cajas.views.caja import (CajaListView,CajaView, CajaImprimirView)
from apps.cajas.views.encabezado_arqueo import ArqueoListView, ArqueoCreateView, ArqueoUpdateView
from apps.cajas.views.cuentasPorCobrar import CuentasListView, CuentasPorCobrarCreateView, RendirCuentaView, DetalleCuentasCobrarView
from apps.cajas.views.transaccionInventario import MovimientoDelDiaListView, MovimientoDelDiaCreateView, MovimientoDelDiaUpdateView, MovimientoDelDiaDetailView
app_name = 'cajas'
urlpatterns = [
    path(
        'cajas/',
        CajaListView.as_view(),
        name="lista-cajas"
    ),
    path(
        'cajas/nuevo/',
        CajaView.as_view(),
        name="nuevo-caja"
    ),
    path(
        'cajas/reporte/<int:pk>/',
        CajaImprimirView.as_view(),
        name="pdf-caja"
    ),
    #arqueo encabezado
    path(
        'arqueos/',
        ArqueoListView.as_view(),
        name="lista-encabezado"
    ),

    path(
        'arqueo/crear',
        ArqueoCreateView.as_view(),
        name='crear-encabezado'

    ),

    path(
        'arqueo/<int:pk>/editar/',
        ArqueoUpdateView.as_view(),
        name = 'editar-encabezado'
    ),

    # Cuentas Por Cobrar
    path(
        'cuentas/',
        CuentasListView.as_view(),
        name = 'lista-cuentas-cobrar'
    ),

    path(
        'cuenta/crear',
        CuentasPorCobrarCreateView.as_view(),
        name = 'crear-cuenta-cobrar'
    ),

    path(
        'cuenta/<int:pk>/rendircuenta',
        RendirCuentaView.as_view(),
        name='rendir-cuenta'
    ),

    path(
        'cuenta/<int:pk>/detalle/',
        DetalleCuentasCobrarView.as_view(),
        name = 'detalle-cuenta'
    ),

    # moviemientos el dia
    path(
        'movimientos/',
        MovimientoDelDiaListView.as_view(),
        name = 'lista-movimiento'
    ),
    path(
        "movimiento/create",
        MovimientoDelDiaCreateView.as_view(), 
        name = "crear-movimiento"
    ),

    path(
        'movimiento/<int:pk>/edit/',
        MovimientoDelDiaUpdateView.as_view(),
        name = "editar-movimiento"
    ),

    path(
        "movimiento/<int:pk>/detalle/",
        MovimientoDelDiaDetailView.as_view(),
        name = "detalle-movimiento"
    )
]    
