# -*- coding: utf-8 -*-

from django.conf import settings
from django.urls import path, include
from django.views import defaults as default_views
from django.views.generic import TemplateView
from django.conf.urls.static import static

from apps.contrib.views.errors import error_400, error_403, error_404, error_500

from django.contrib import admin


admin.site.site_header = 'Wise'
admin.site.site_title = 'Simicrofin Admin'
admin.site.index_title = 'Simicrofin Admin'

urlpatterns = [

    path('edit/', TemplateView.as_view(template_name='version2/zona/edit.html'), name="zona_crear"),
    # Django ADMIN
    path(settings.ADMIN_URL, admin.site.urls),

    path('accounts/', include('allauth.urls')),

    # Landing Page
    path('', TemplateView.as_view(template_name='version2/landing/landing.html'), name="home"),
    path('new/', TemplateView.as_view(template_name='version2/landing/landing.html'), name="new-home"),
    path('quienes-somos/', TemplateView.as_view(template_name='version2/landing/quienes_somos.html'), name="quienes-somos"),
    #path('dashboard/', TemplateView.as_view(template_name='simicrofin/panel.html'), name='dashboard'),
    path('dashboard/', TemplateView.as_view(template_name='version2/dashboard.html', extra_context=dict(menu="DASHBOARD")), name='dashboard'),
    
    #pruebas
    path('new/', TemplateView.as_view(template_name='version2/layouts/base8.html'), name="base"),
    path('new/sol/', TemplateView.as_view(template_name='version2/solicitud/solicitud.html'), name="base"),
    

    #cajas
    path('caja/', include('apps.cajas.urls', namespace='cajas')),

    #cuentas por cobrar
    #path('cuentas_cobrar/', include('apps.cajas.urls', namespace='cuentasPorCobrar')),

    # Transaccion Inventario
    #path('movimiento/', include('apps.cajas.urls', namespace='movimientoDelDia')),

    # grupo solidario
    path('grupo_solidario/', include('apps.grupo.urls', namespace='grupo')),
    
    #APISgrupoa 
    # apis grupo
    path('api/', include('apps.grupo.api.urls', namespace='api-grupo')),

    #prueba de zonas
    path('zona/', include('apps.zona.urls', namespace='zona')),
    #APIS zona 
    #path('api/', include('apps.zona.api.urls', namespace='api-zona')),
    path('api/', include('apps.zona.api.urls', namespace='api-zona')),
    # apis cajas
    path('api/', include('apps.cajas.api.urls', namespace='api-cajas')),
    # apis deposito
    path('api/', include('apps.deposito.api.urls', namespace='api-deposito')),
    # apis creditos
    path('api/', include('apps.credito.api.urls', namespace='api-credito')),
    
    
    
    
    # apis cortes monedas
    #path('api/', include('apps.corte_moneda.api.urls', namespace='api-corte_moneda')),

    #landings_extra

    # In building page
    path('in-building/', TemplateView.as_view(template_name='layouts/errors/building.html'), name='building'),

    # Empresa
    path('api/', include('apps.empresa.api.urls', namespace='api-empresa')),  # api
    path('', include('apps.empresa.urls', namespace='empresa')),  # transactions

    # Account
    path('api/', include('apps.accounts.api.urls', namespace='api-accounts')),  # api
    path('', include('apps.accounts.urls', namespace='accounts')),  # transactions

    # Administracion

    # Sync
    path('health/', include('health_check.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:

    # Emails
    urlpatterns += [
        path('transactional-emails/base/', TemplateView.as_view(
            template_name='transactions/emails/base.html',
        )),

        path('transactional-emails/confirm-email/', TemplateView.as_view(
            template_name='transactions/emails/confirm_email/message.html',
        )),

        path('transactional-emails/reset-password/', TemplateView.as_view(
            template_name='transactions/emails/reset_password/message.html',
        )),
    ]

    # Pages & errors
    urlpatterns += [
        path('400/', TemplateView.as_view(template_name='layouts/errors/400.html'), name='error-400'),
        path('403/', TemplateView.as_view(template_name='layouts/errors/403.html'), name='error-403'),
        path('404/', TemplateView.as_view(template_name='layouts/errors/404.html'), name='error-404'),
        path('500/', TemplateView.as_view(template_name='layouts/errors/500.html'), name='error-500'),
    ]

    urlpatterns += [
        path('error/400/', default_views.bad_request, kwargs={'exception': Exception('Bad Request!')}),
        path('error/403/', default_views.permission_denied, kwargs={'exception': Exception('Permission Denied')}),
        path('error/404/', default_views.page_not_found, kwargs={'exception': Exception('Page not Found')}),
        path('error/500/', default_views.server_error),
    ]

    # Developer tools
    if 'debug_toolbar' in settings.INSTALLED_APPS:
        if settings.DEBUG:
            import debug_toolbar  # noqa: WPS433
        urlpatterns += [
            path('__debug__/', include(debug_toolbar.urls)),
        ]
else:
    handler400 = error_400
    handler403 = error_403
    handler404 = error_404
    handler500 = error_500
