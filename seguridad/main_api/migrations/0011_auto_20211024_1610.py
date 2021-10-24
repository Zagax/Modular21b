# Generated by Django 3.2.6 on 2021-10-24 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_api', '0010_auto_20211023_0855'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='CDU',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='CRM',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='CUCEI',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='Exterior',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='IMSS',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='ISSSTE',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='NoAmerita',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='POLI',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='PRIVADO',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='Prepa12',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='SMM',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='SeNiega',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='TrasladoCUCEI',
        ),
        migrations.RemoveField(
            model_name='hojaurgencias',
            name='VOCA',
        ),
        migrations.AddField(
            model_name='hojaurgencias',
            name='ProvieneDe',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='hojaurgencias',
            name='TrasladoA',
            field=models.CharField(default='', max_length=150),
        ),
    ]
