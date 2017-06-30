from drf_auto_endpoint.endpoints import Endpoint
from .models import Room, Day, TemplateTask, TaskInstance

class RoomEndpoint(Endpoint):

    model = Room
    read_only = True

class DayEndpoint(Endpoint):

    model = Day
    read_only = True

class TemplateTaskEndpoint(Endpoint):

    model = TemplateTask
    read_only = True

class TaskInstanceEndpoint(Endpoint):
    model = TaskInstance
    read_only = True
    filter_fields = ('task__room', 'date',)
