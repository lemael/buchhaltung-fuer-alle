from django.db import models

class Kategorie(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Buchung(models.Model):
    class TypChoices(models.TextChoices):
        EINNAHME = 'Einnahme', 'Einnahme'
        AUSGABE = 'Ausgabe', 'Ausgabe'

    beschreibung = models.CharField(max_length=255)
    betrag = models.DecimalField(max_digits=10, decimal_places=2)
    typ = models.CharField(max_length=10, choices=TypChoices.choices)
    kategorie = models.ForeignKey(Kategorie, on_delete=models.PROTECT, related_name='buchungen')
    datum = models.DateField()

    class Meta:
        ordering = ['-datum']

    def __str__(self):
        return f"{self.datum} - {self.beschreibung}: {self.betrag} €"