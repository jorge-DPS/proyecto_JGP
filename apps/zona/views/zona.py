import json
import datetime
from django.views.generic import (TemplateView, DetailView, CreateView)
from django.contrib.auth.mixins import PermissionRequiredMixin
from apps.zona.models import Zona
from apps.zona.views.formulario import ZonaForm
from django.utils import timezone
from django.urls import reverse_lazy


class ZonaListView(TemplateView, PermissionRequiredMixin):
    permission_required="zona.view_zona"
    template_name = 'version2/zona/lista.html'
    def get_queryset(self):
        return Zona.objects.all()
    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['zona'] = Zona.objects.filter(eliminado_en=None).order_by('-id')
        return context

class ZonaCreateView(CreateView,PermissionRequiredMixin):
    permission_required = "zona.add_zona"
    model = Zona
    form_class = ZonaForm
    template_name = 'version2/zona/create.html'
    #success_url = reverse_lazy('lista_zona:zona') 
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['zona'] = timezone.now()
        return context

class ZonaUpdateView(TemplateView):
    model = Zona
    #fields = ['descripcion', 'localidad']
    form_class = ZonaForm
    template_name = 'version2/zona/edit.html'
    menu = Zona
    #success_url = reverse_lazy('lista_zona:zona') 
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['zona'] = Zona.objects.get(id=kwargs['pk'])
        return context

class ZonaDetalleView(TemplateView):
    model = Zona
    form_class = ZonaForm
    template_name = 'version2/zona/detail.html'
    menu = Zona
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['zona'] = Zona.objects.get(pk=kwargs['pk'])
        return context

