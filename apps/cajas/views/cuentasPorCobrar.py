from django.views.generic import TemplateView, DetailView, CreateView
from django.contrib.auth.mixins import PermissionRequiredMixin
from apps.cajas.models.arqueo import CuentasPorCobrar
from apps.cajas.views.cuentasPorCobrarForm import CuentasPorCobrarForm
from django.utils import timezone
from django.urls import reverse_lazy


class CuentasListView(TemplateView, PermissionRequiredMixin):
    #permission_required="grupo.view_zona"

    template_name = 'version2/caja/cuentas_por_cobrar/list.html'

    def get_queryset(self):
        return CuentasPorCobrar.objects.all()
    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        
        context['cuentasPorCobrar'] = CuentasPorCobrar.objects.filter(eliminado_en=None).order_by('-id')
        return context

class CuentasPorCobrarCreateView(CreateView,PermissionRequiredMixin):
    #permission_required = "grupo.add_zona"
    model = CuentasPorCobrar
    form_class = CuentasPorCobrarForm
    template_name = 'version2/caja/cuentas_por_cobrar/create.html'
    #success_url = reverse_lazy('lista_encabezado:cajas') 
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['cuentasPorCobrar'] = CuentasPorCobrar.objects.filter(eliminado_en=None).order_by('-id')
        return context

class RendirCuentaView(TemplateView):
    model = CuentasPorCobrar
    template_name = 'version2/caja/cuentas_por_cobrar/rendirCuentas.html'
    menu = CuentasPorCobrar
    #success_url = reverse_lazy('cajas:editar-encabezado') 
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['cuentasPorCobrar'] = CuentasPorCobrar.objects.get(id=kwargs['pk'])
        return context

class DetalleCuentasCobrarView(TemplateView):
    model = CuentasPorCobrar
    form_class = CuentasPorCobrarForm
    template_name = 'version2/caja/cuentas_por_cobrar/detalleCuentas.html'
    menu = CuentasPorCobrar
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['cuentasPorCobrar'] = CuentasPorCobrar.objects.get(pk=kwargs['pk'])
        return context        