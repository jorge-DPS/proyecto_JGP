from datetime import datetime
from apps.contrib.api.viewsets import ModelCreateListViewSet
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response

from apps.zona.api.v1.serializers.localidad import LocalidadListSerializer, LocalidadFilterSerializer
from apps.zona.models.localidad import Localidad

from rest_framework import filters
from rest_framework import generics

class FilterLocalidad(generics.ListAPIView):
    queryset = Localidad.objects.all()
    serializer_class = LocalidadFilterSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['descripcion','creado_en']


class LocalidadCRUD(ModelCreateListViewSet):
    model= Localidad
    serializer_class = LocalidadListSerializer
    queryset=Localidad.objects.all()
    
    def get_queryset(self):
        return Localidad.objects.all()
    
    def list(self, request, *args, **kwargs):
        print("***********CARGANDO LOCALIDAD***********")
        localidad = Localidad.objects.all()
        return Response(LocalidadListSerializer(localidad, many=True).data, status=status.HTTP_200_OK)
    def retrive(self, request, *args, **kwargs):
        print("Detalles del id :============== ",kwargs["id"])
        localidad_detalle = Localidad.objects.get(id=kwargs["id"])
        localidad_serializer=self.serializer_class(localidad_detalle)
        return Response(localidad_serializer.data, status=status.HTTP_200_OK)
#para crear
    def create(self, request, *args, **kwargs):
        data=request.data
        #descomentar para el uso de datos del usuario
        #data['usuarios_actualizacion']=request.user.pk
        #data['sucursal_creacion']=request.user.branch_office_id
        print("------------------ Crear Localidad ------------------",data)
        serializer = LocalidadListSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        Localidad = serializer.create(serializer.validated_data)
        return Response(LocalidadListSerializer(Localidad).data, status=status.HTTP_201_CREATED)
#actualizar
    def update(self, request, *args, **kwargs):
        print("actualizando del id :============== ",kwargs["id"])
        #data=request.data
        actualizarZona = Localidad.objects.get(id=kwargs["id"])
        #actualizarZona.usuarios_actualizacion=request.user.pk
        #actualizarZona.sucursal_creacion=request.user.branch_office_id
        serializer = LocalidadListSerializer(actualizarZona,data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print("------------------ actualizado Localidad ------------------",actualizarZona)
        return Response(LocalidadListSerializer(actualizarZona).data, status=status.HTTP_201_CREATED)
#para delete
    def delete(self, request, *args, **kwargs):
        print("eliminando un  Localidad")
        eliminarLocalidad = Localidad.objects.get(id=kwargs["id"])
        eliminarLocalidad.eliminado_en=datetime.now()
        eliminarLocalidad.save()
        return Response(LocalidadListSerializer(eliminarLocalidad, many=False).data, status=status.HTTP_200_OK)