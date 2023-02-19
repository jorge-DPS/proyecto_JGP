from django.views.generic import TemplateView, DetailView, CreateView
from django.contrib.auth.mixins import PermissionRequiredMixin
from apps.cajas.models.arqueo import CorteMoneda, EncabezadoArqueo
from apps.cajas.views.arqueoForm import ArqueoForm
from django.utils import timezone
from django.urls import reverse_lazy


class ArqueoListView(TemplateView, PermissionRequiredMixin):
    #permission_required="grupo.view_zona"

    template_name = 'version2/caja/arqueo_caja/list.html'

    def get_queryset(self):
        return EncabezadoArqueo.objects.all()
    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        
        context['enacabezado_arqueo2'] = EncabezadoArqueo.objects.filter(eliminado_en=None).filter(arqueo_definitivo=True).order_by('-id')
        return context

class ArqueoCreateView(CreateView,PermissionRequiredMixin):
    #permission_required = "grupo.add_zona"
    model = EncabezadoArqueo
    form_class = ArqueoForm
    template_name = 'version2/caja/arqueo_caja/create.html'
    success_url = reverse_lazy('lista_encabezado:cajas') 
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['enacabezado_arqueo'] = EncabezadoArqueo.objects.filter(eliminado_en=None).order_by('-id')
        return context

class ArqueoUpdateView(TemplateView):
    model = EncabezadoArqueo
    template_name = 'version2/caja/arqueo_caja/edit.html'
    menu = EncabezadoArqueo
    #success_url = reverse_lazy('cajas:editar-encabezado') 
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['enacabezado_arqueo'] = EncabezadoArqueo.objects.get(id=kwargs['pk'])
        return context