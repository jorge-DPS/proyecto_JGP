
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('empresa', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Deposito',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero_cuenta', models.PositiveSmallIntegerField(choices=[(1, 'BISA - 777342 401 7'), (2, 'BNB - 1502360716'), (3, 'Economico - 2051563479'), (4, 'Mercantil - 4068641015'), (5, 'Solidario - 311780 000 001'), (6, 'Solidario - 311780 000 002'), (7, 'Solidario - 311780 000 003'), (8, 'Solidario - 311780-000-001'), (9, 'Solidario - 311780-000-002'), (10, 'Solidario - 311780-000-003'), (11, 'Union - 10000030927541')], verbose_name='Numero cuenta')),
                ('fecha_deposito', models.CharField(max_length=19)),
                ('descripcion', models.CharField(max_length=250, verbose_name='Descripcin de extracto deposito')),
                ('numero_transaccion', models.CharField(max_length=250, unique=True, verbose_name='Numero transaccion')),
                ('monto_mn', models.DecimalField(decimal_places=2, max_digits=8, verbose_name='Monto mn')),
                ('estado', models.CharField(choices=[('P', 'Pendiente'), ('A', 'Aplicado')], default='P', max_length=1, verbose_name='Estado')),
                ('creado_en', models.DateTimeField()),
                ('actualizado_en', models.DateTimeField(blank=True, null=True)),
                ('eliminado_en', models.DateTimeField(blank=True, null=True, verbose_name='Fecha Eliminacion')),
                ('sucursal_creacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='empresa.Sucursal')),
                ('usuario_actualizacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Extracto Deposito',
                'verbose_name_plural': 'Extractos Depositos',
                'db_table': 'cre_extracto_deposito',
            },
        ),
    ]
