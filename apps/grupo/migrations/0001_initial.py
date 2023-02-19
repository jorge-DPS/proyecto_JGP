
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('empresa', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Grupo',
            fields=[
                ('codigo_grupo', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('descripcion_grupo', models.CharField(max_length=50, unique=True, verbose_name='Descripcion de grupo solidario')),
                ('secuencia_grupo', models.SmallIntegerField(default=0, verbose_name='secuencia_grupo')),
                ('ultima_operacion', models.BigIntegerField(default=0, verbose_name='ultima_operacion')),
                ('creado_en', models.DateTimeField()),
                ('actualizado_en', models.DateTimeField(blank=True, null=True, verbose_name='Fecha actualizacion')),
                ('eliminado_en', models.DateTimeField(blank=True, null=True, verbose_name='Fecha Eliminacion')),
                ('sucursal_creacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='empresa.Sucursal')),
                ('usuario_actualizacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Grupo solidario',
                'verbose_name_plural': 'Grupos solidarios',
                'db_table': 'cli_tbl_grupos_solidarios',
            },
        ),
    ]
