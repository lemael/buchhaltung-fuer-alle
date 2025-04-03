from django.contrib import admin
from tasks.views import task_list
from django.urls import path,include
from tasks.views import create_task
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)



urlpatterns = [
  
    path('', task_list, name='task-list'),
    path('create/', create_task, name='task-create'),
    path('', include(router.urls)),
]


