from django.contrib import admin

from .models import Room, TemplateTask, Day

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):

    pass

@admin.register(TemplateTask)
class TemplateTaskAdmin(admin.ModelAdmin):

    list_display = ['description', 'room', 'day']

@admin.register(Day)
class DayAdmin(admin.ModelAdmin):

    pass

