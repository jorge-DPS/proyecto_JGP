# Generated by Django 3.0 on 2022-10-26 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deposito', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deposito',
            name='actualizado_en',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='deposito',
            name='creado_en',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='deposito',
            name='eliminado_en',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Fecha Eliminacion'),
        ),
    ]