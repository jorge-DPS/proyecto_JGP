from rest_framework import serializers
from apps.zona.models import Localidad

class LocalidadListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localidad
        fields = (
            'id',
            'descripcion', 
            'codigo_departamento',
            'codigo_localidad',
            'usuario_actualizacion',
            'sucursal_creacion',
            'creado_en',
            'actualizado_en',
            'eliminado_en',
        )

class LocalidadFilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localidad
        fields = (
            'id',
            'descripcion', 
            'codigo_departamento',
            'codigo_localidad',
            'creado_en',
            
        )
