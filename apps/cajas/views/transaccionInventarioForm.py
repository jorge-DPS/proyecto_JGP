from django.forms import ModelForm
from apps.cajas.models.arqueo import TransaccionInventario

from django import forms
from django.forms import TextInput, EmailInput

class MovimientoDelDiaForm(ModelForm):
    class Meta:
        model = TransaccionInventario
        fields = [
            'id',
            'caja_id',
            'fecha_transaccion',
            'producto_financiero_id',
            'detalle',
            'fondo',
            'monto_ingreso',
            'monto_salida',
            'usuario_actualizacion',
            'sucursal_creacion',
            'creado_en',
            'actualizado_en',
            'eliminado_en',
        ]