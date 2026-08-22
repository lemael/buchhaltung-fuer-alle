from django.core.management.base import BaseCommand
from apps.buchhaltung.models import Kategorie
from datetime import date

class Command(BaseCommand):
    help = "Füllt die Datenbank mit Demodaten."

    def handle(self, *args, **kwargs):
        self.stdout.write("Erstellung der Kategorien...")
        kats = ['Bürobedarf', 'Software', 'Internet', 'Dienstleistungen', 'Reisen']
        kat_objs = {name: Kategorie.objects.get_or_create(name=name)[0] for name in kats}
        self.stdout.write(self.style.SUCCESS("Datenbank erfolgreich mit Demodaten gefüllt!"))