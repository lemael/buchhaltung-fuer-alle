from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import KategorieViewSet, BuchungViewSet

router = DefaultRouter()
router.register(r'kategorien', KategorieViewSet, basename='kategorie')
router.register(r'buchungen', BuchungViewSet, basename='buchung')
urlpatterns = [
    path('', include(router.urls)),
]