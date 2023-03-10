# Generated by Django 3.0 on 2022-11-04 22:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credito', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='evaluacioneconomica',
            name='actividad_evaluada',
            field=models.CharField(choices=[('C', 'Comercio'), ('P', 'Produccion'), ('S', 'Servicio')], max_length=1, verbose_name='Actividad evaluada'),
        ),
        migrations.AlterField(
            model_name='evaluacioneconomica',
            name='ciclo_rotacion',
            field=models.CharField(choices=[('D', 'Diario'), ('S', 'Semanal'), ('Q', 'Quincenal'), ('M', 'Mensual')], max_length=1, verbose_name='Ciclo rotacion'),
        ),
        migrations.AlterField(
            model_name='evaluacioneconomica',
            name='ventas_aproximada_domingo',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Ventas aproximada domingo'),
        ),
        migrations.AlterField(
            model_name='evaluacioneconomica',
            name='ventas_aproximada_jueves',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Ventas aproximada jueves'),
        ),
        migrations.AlterField(
            model_name='evaluacioneconomica',
            name='ventas_aproximada_lunes',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Ventas aproximada Lunes'),
        ),
        migrations.AlterField(
            model_name='evaluacioneconomica',
            name='ventas_aproximada_martes',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Ventas aproximada martes'),
        ),
        migrations.AlterField(
            model_name='evaluacioneconomica',
            name='ventas_aproximada_miercoles',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Ventas aproximada miercoloes'),
        ),
        migrations.AlterField(
            model_name='evaluacioneconomica',
            name='ventas_aproximada_sabado',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Ventas aproximada sabado'),
        ),
        migrations.AlterField(
            model_name='evaluacioneconomica',
            name='ventas_aproximada_viernes',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Ventas aproximada viernes'),
        ),
        migrations.AlterField(
            model_name='gastofamiliarmes',
            name='agua',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Agua del mes'),
        ),
        migrations.AlterField(
            model_name='gastofamiliarmes',
            name='alimentacion',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Alimentacion del mes'),
        ),
        migrations.AlterField(
            model_name='gastofamiliarmes',
            name='educacion',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Educacion del mes'),
        ),
        migrations.AlterField(
            model_name='gastofamiliarmes',
            name='electricidad',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Electricidad del mes'),
        ),
        migrations.AlterField(
            model_name='gastofamiliarmes',
            name='otros',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Otros del mes'),
        ),
        migrations.AlterField(
            model_name='gastofamiliarmes',
            name='recreacion',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Recreacion del mes'),
        ),
        migrations.AlterField(
            model_name='gastofamiliarmes',
            name='salud',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Salud del mes'),
        ),
        migrations.AlterField(
            model_name='gastofamiliarmes',
            name='telefono',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Telefono del mes'),
        ),
        migrations.AlterField(
            model_name='gastofamiliarmes',
            name='transporte',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Transporte del mes'),
        ),
        migrations.AlterField(
            model_name='gastofamiliarmes',
            name='vestuario',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Vestuario del mes'),
        ),
        migrations.AlterField(
            model_name='gastofamiliarmes',
            name='vivienda',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Vivienda del mes'),
        ),
        migrations.AlterField(
            model_name='gastooperativomes',
            name='agua',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Agua del mes'),
        ),
        migrations.AlterField(
            model_name='gastooperativomes',
            name='alquileres',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Alquileres del mes'),
        ),
        migrations.AlterField(
            model_name='gastooperativomes',
            name='electricidad',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Electricidad del mes'),
        ),
        migrations.AlterField(
            model_name='gastooperativomes',
            name='impuesto',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Impuesto del mes'),
        ),
        migrations.AlterField(
            model_name='gastooperativomes',
            name='mantenimiento',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Mantenimiento del mes'),
        ),
        migrations.AlterField(
            model_name='gastooperativomes',
            name='otros',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Otros del mes'),
        ),
        migrations.AlterField(
            model_name='gastooperativomes',
            name='reparaciones',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Reparaciones del mes'),
        ),
        migrations.AlterField(
            model_name='gastooperativomes',
            name='salarios',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Salarios del mes'),
        ),
        migrations.AlterField(
            model_name='gastooperativomes',
            name='telefono',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Telefono del mes'),
        ),
        migrations.AlterField(
            model_name='gastooperativomes',
            name='transporte',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Transporte del mes'),
        ),
        migrations.AlterField(
            model_name='otroingreso',
            name='conyugue',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Conyugue'),
        ),
        migrations.AlterField(
            model_name='otroingreso',
            name='otro_ingresos',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Otro ingresos'),
        ),
        migrations.AlterField(
            model_name='otroingreso',
            name='otro_negocio',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Otro negocio'),
        ),
        migrations.AlterField(
            model_name='otroingreso',
            name='rentas',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12, verbose_name='Rentas'),
        ),
        migrations.AlterField(
            model_name='pendiente',
            name='genero',
            field=models.CharField(choices=[('M', 'Masculino'), ('F', 'Femenino')], max_length=1, verbose_name='Genero'),
        ),
        migrations.AlterField(
            model_name='pendiente',
            name='nivel_estudio',
            field=models.CharField(choices=[('K', 'Kinder'), ('P', 'Primaria'), ('S', 'Secundaria'), ('T', 'Tecnica'), ('U', 'Universitaria'), ('N', 'Sin Formacion')], max_length=1, verbose_name='Nivel de estudio'),
        ),
    ]
