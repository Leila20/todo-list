from django.conf.urls import include, url
from drf_auto_endpoint.router import router
from .endpoints import RoomEndpoint, DayEndpoint, TemplateTaskEndpoint, TaskInstanceEndpoint
#from list.endpoints import ListItemEndpoint, ListEndpoint

from .views import UserViewSet


router.registerViewSet(r'userinfos', UserViewSet)
router.register(endpoint=RoomEndpoint())
router.register(endpoint=DayEndpoint())
router.register(endpoint=TemplateTaskEndpoint())
router.register(endpoint=TaskInstanceEndpoint())
#router.register(endpoint=ListItemEndpoint())
#router.register(endpoint=ListEndpoint())

urlpatterns = [
    url(r'', include(router.urls)),
]
