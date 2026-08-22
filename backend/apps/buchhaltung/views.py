from rest_framework import viewsets
from .models import Kategorie, Buchung
from .serializers import KategorieSerializer, BuchungSerializer

class KategorieViewSet(viewsets.ModelViewSet):
    queryset = Kategorie.objects.all()
    serializer_class = KategorieSerializer

class BuchungViewSet(viewsets.ModelViewSet):
    queryset = Buchung.objects.all()
    serializer_class = BuchungSerializer