from logging import PlaceHolder

from django.forms import ModelForm
from apps.cajas.models.arqueo import EncabezadoArqueo

from django import forms
from django.forms import TextInput, EmailInput

class ArqueoForm(ModelForm):
    class Meta:
        model = EncabezadoArqueo
        fields =[
            'caja_id',        
            'usuario_id',
            'observaciones',   
            'fecha_arqueo',
            'total_arqueo_mn',
            'total_arqueo_me',
            'arqueo_definitivo',
            'usuario_actualizacion',
            'sucursal_creacion',     
        ]
        labels = {
            'caja_id': 'seleccione ID de caja',
            'usauario_id': 'sesion de usuario',
            'observaciones': 'ingreso observaciones',
            'fecha_arqueo' : 'ingrese fecha',
            'total_arqueo_mn': 'ingreso_total_mn',
            'total_arqueo_me': 'ingreso_total_me',
            'arqueo_definitivo' : 'arqueo definitivo',
            'usuario_actualizacion' : 'usuario actualizacion',
            'sucursal_creacion' : 'sucarsal creacion', 
            
        }
        