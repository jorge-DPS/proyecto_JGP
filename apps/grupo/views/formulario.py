from logging import PlaceHolder

from django.forms import ModelForm
from apps.grupo.models import Grupo

from django import forms
from django.forms import TextInput, EmailInput

class GrupoForm(ModelForm):
    class Meta:
        model = Grupo
        fields =[
                       
            'descripcion_grupo',        
            'secuencia_grupo'         
        ]
        labels = {
            'descripcion_grupo': 'Descripcion de grupo',
            'secuencia_grupo': 'Secuencia Grupo',
            
        }
        