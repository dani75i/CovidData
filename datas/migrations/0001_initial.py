# Generated by Django 3.0.5 on 2020-05-02 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='No Name', max_length=255)),
                ('duration', models.IntegerField(default=0, help_text='Duration in seconds')),
                ('lyrics', models.TextField(blank=True)),
            ],
        ),
    ]
