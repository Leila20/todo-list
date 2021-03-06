from drf_auto_endpoint.endpoints import Endpoint
from .models import Room, Day, TemplateTask, TaskInstance
from .views import TaskTemplateViewSet

class RoomEndpoint(Endpoint):

    model = Room

class DayEndpoint(Endpoint):

    model = Day

class TemplateTaskEndpoint(Endpoint):

    model = TemplateTask
    base_viewset = TaskTemplateViewSet

class TaskInstanceEndpoint(Endpoint):
    model = TaskInstance
    filter_fields = ('task__room', 'date',)
