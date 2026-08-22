from django.contrib import admin
from .models import Kategorie, Buchung
# Register your models here.

@admin.register(Kategorie)
class KategorieAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Buchung)
class BuchungAdmin(admin.ModelAdmin):
    list_display = ('datum', 'beschreibung', 'betrag', 'typ', 'kategorie')
    list_filter = ('typ', 'kategorie', 'datum')
    search_fields = ('beschreibung',)