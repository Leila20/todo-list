from drf_auto_endpoint.endpoints import Endpoint
from drf_auto_endpoint.router import register

from .models import ListItem, List

@register
class ListItemEndpoint(Endpoint):

    model = ListItem

@register
class ListEndpoint(Endpoint):

    model = List
