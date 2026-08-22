from rest_framework import serializers
from .models import Kategorie, Buchung

# model serializers for Kategorie and Buchung to convert model instances to JSON and vice versa

class KategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategorie
        fields = ['id', 'name']

class BuchungSerializer(serializers.ModelSerializer):
    kategorie = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Kategorie.objects.all()
    )

    class Meta:
        model = Buchung
        fields = ['id', 'beschreibung', 'betrag', 'typ', 'kategorie', 'datum']