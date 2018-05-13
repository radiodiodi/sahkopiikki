# Generated by Django 2.0.5 on 2018-05-09 15:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20180509_1322'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='balance',
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.IntegerField(help_text='In cents'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='price',
            field=models.IntegerField(help_text='In cents'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='transactions', to='api.UserProfile'),
        ),
    ]