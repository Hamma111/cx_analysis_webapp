# Generated by Django 3.2 on 2022-03-28 12:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.DeleteModel(
            name="WhitelistPermission",
        ),
    ]