# Generated by Django 3.2.3 on 2023-02-24 05:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('amsApp', '0008_auto_20230222_2205'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accidentalert',
            name='accId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='amsApp.accident'),
        ),
        migrations.AlterField(
            model_name='accidentalert',
            name='hosId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='amsApp.hospital'),
        ),
        migrations.AlterField(
            model_name='accidentalert',
            name='polId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='amsApp.policestation'),
        ),
    ]
