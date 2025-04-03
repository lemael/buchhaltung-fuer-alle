from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'completed']

#admin.site.register(Task) // pour enregistrer le model Task dans l'admin
