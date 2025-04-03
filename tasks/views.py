from django.shortcuts import render, redirect
from .models import Task
from .forms import TaskForm
from rest_framework import viewsets
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

def create_task(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('task-list')  # nom de la route vers la liste
    else:
        form = TaskForm()
    return render(request, 'tasks/create_task.html', {'form': form})

def task_list(request):
    tasks = Task.objects.all()
    return render(request, 'tasks/task_list.html', {'tasks': tasks})
