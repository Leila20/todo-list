import os

from datetime import date

from django.contrib.auth import get_user_model
from django.views.generic import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.static import serve
from django.utils.decorators import method_decorator
from django.contrib.auth import login, logout
from django.http import Http404
from django.conf import settings

from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import filters

from .models import TaskInstance

from .serializers import UserSerializer, LoginSerializer


class MeView(RetrieveAPIView):

    serializer_class = UserSerializer
    queryset = get_user_model().objects
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return self.get_queryset().get(pk=self.request.user.id)


class LoginView(APIView):

    permission_classes = (AllowAny, )

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            login(request, serializer.validated_data['user'])
            return Response({}, status=status.HTTP_200_OK)
        return Response(None, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request, format=None):
        logout(request)
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class UserViewSet(ModelViewSet):

    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()
    filter_backends = (filters.DjangoFilterBackend, )
    filter_fields = ('first_name', 'last_name',)


class TaskTemplateViewSet(ModelViewSet):

    def perform_create(self, serializer):
        template = serializer.save()
        today = date.today()

        if template.day.matches(today):
            instance = TaskInstance(task=template, done=False, date=today)
            instance.save()



class EmberView(TemplateView):

    @method_decorator(ensure_csrf_cookie)
    def get(self, request, *args, **kwargs):
        if request.is_ajax():
            raise Http404()
        return super(EmberView, self).get(request, *args, **kwargs)


EMBER_DIST_PATH = os.path.join(settings.BASE_DIR, '..', 'front', 'dist')


def service_worker_view(request, filetype, buildhash):
    return serve(request, '{}-{}.js'.format(filetype, buildhash), EMBER_DIST_PATH)


def root_files_view(request, filename):
    return serve(request, filename, EMBER_DIST_PATH)
