from logging import PlaceHolder

from django.forms import ModelForm
from apps.cajas.models.arqueo import CuentasPorCobrar

from django import forms
from django.forms import TextInput, EmailInput

class CuentasPorCobrarForm(ModelForm):
    class Meta:
        model = CuentasPorCobrar
        fields =[         
            'caja_id',
            'funcionario_id',
            'fecha_entrega',
            'monto_entregado',
            'monto_devuelto',
            'monto_saldo',
            'fecha_ultimo_pago',
            'estado',
            'usuario_actualizacion',
            'sucursal_creacion',
            'creado_en',
            'actualizado_en',
            'eliminado_en',     
        ]
        