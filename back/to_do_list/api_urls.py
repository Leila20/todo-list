from django.conf.urls import include, url
from drf_auto_endpoint.router import router
from .endpoints import RoomEndpoint, DayEndpoint, TemplateTaskEndpoint, TaskInstanceEndpoint

from .views import UserViewSet


router.registerViewSet(r'userinfos', UserViewSet)
router.register(endpoint=RoomEndpoint())
router.register(endpoint=DayEndpoint())
router.register(endpoint=TemplateTaskEndpoint())
router.register(endpoint=TaskInstanceEndpoint())

urlpatterns = [
    url(r'', include(router.urls)),
]
