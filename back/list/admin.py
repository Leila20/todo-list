from django.contrib import admin

from .models import ListItem, List


@admin.register(ListItem)
class ListItemAdmin(admin.ModelAdmin):

    list_display = ['__str__']


@admin.register(List)
class ListAdmin(admin.ModelAdmin):

    list_display = ['__str__']
