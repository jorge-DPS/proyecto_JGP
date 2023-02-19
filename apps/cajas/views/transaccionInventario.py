from django.views.generic import TemplateView, DetailView, CreateView
from django.contrib.auth.mixins import PermissionRequiredMixin
from apps.cajas.models.arqueo import TransaccionInventario
from apps.cajas.views.transaccionInventarioForm import MovimientoDelDiaForm
from django.utils import timezone
from django.urls import reverse_lazy
from datetime import datetime

class fechaActual(object):
    def fechaHoy(self):
        current_time = datetime.now().date()
        return current_time

class MovimientoDelDiaListView(TemplateView, PermissionRequiredMixin, fechaActual):
    #permission_required="cajas."

    template_name = 'version2/caja/movimientos/list.html'

    def get_queryset(self):
        return TransaccionInventario.objects.all()
    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        #current_time = datetime.now().date()
        context['fechaActual'] = self.fechaHoy()
        #current_time = datetime.now().time()  
        context['movimientoDelDia'] = TransaccionInventario.objects.filter(eliminado_en=None).order_by('-id')
        return context

    def index(self):
        context = super().get_context_data()
        current_time = datetime.now().time()  
        context['fechaActual'] = current_time
        return context

class MovimientoDelDiaCreateView(CreateView,PermissionRequiredMixin):
    #permission_required = "grupo.add_zona"
    model = TransaccionInventario
    form_class = MovimientoDelDiaForm
    template_name = 'version2/caja/movimientos/create.html'
    #success_url = reverse_lazy('lista_encabezado:cajas') 
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['movimientoDelDia'] = TransaccionInventario.objects.filter(eliminado_en=None).order_by('-id')
        return context

class MovimientoDelDiaUpdateView(TemplateView):
    model = TransaccionInventario
    template_name = 'version2/caja/movimientos/update.html'
    menu = TransaccionInventario
    #success_url = reverse_lazy('cajas:editar-encabezado') 
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['movimientoDelDia'] = TransaccionInventario.objects.get(id=kwargs['pk'])
        return context

class MovimientoDelDiaDetailView(TemplateView, fechaActual):
    model = TransaccionInventario
    form_class = MovimientoDelDiaForm
    template_name = 'version2/caja/movimientos/detail.html'
    menu = TransaccionInventario
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['fechaActual'] = self.fechaHoy()

        context['movimientoDelDia'] = TransaccionInventario.objects.get(pk=kwargs['pk'])
        return context        
