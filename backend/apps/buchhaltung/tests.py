from django.test import TestCase

# Create your tests here.

from datetime import date
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.buchhaltung.models import Kategorie, Buchung


class KategorieAPITests(APITestCase):
    """Tests pour l'API /api/kategorien/"""

    def setUp(self):
        self.kategorie = Kategorie.objects.create(name="Bürobedarf")
        self.list_url = reverse("kategorie-list")
        self.detail_url = reverse("kategorie-detail", kwargs={"pk": self.kategorie.pk})

    def test_get_kategorien_list(self):
        """Vérifie la récupération de la liste des catégories (GET)"""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Bürobedarf")

    def test_create_kategorie(self):
        """Vérifie la création d'une nouvelle catégorie (POST)"""
        data = {"name": "Software"}
        response = self.client.post(self.list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Kategorie.objects.count(), 2)
        self.assertEqual(Kategorie.objects.get(id=response.data["id"]).name, "Software")

    def test_update_kategorie(self):
        """Vérifie la mise à jour d'une catégorie (PUT)"""
        data = {"name": "Büromaterial & Hardware"}
        response = self.client.put(self.detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.kategorie.refresh_from_db()
        self.assertEqual(self.kategorie.name, "Büromaterial & Hardware")

    def test_delete_kategorie(self):
        """Vérifie la suppression d'une catégorie (DELETE)"""
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Kategorie.objects.count(), 0)


class BuchungAPITests(APITestCase):
    """Tests pour l'API /api/buchungen/"""

    def setUp(self):
        self.kategorie = Kategorie.objects.create(name="Dienstleistungen")
        self.buchung = Buchung.objects.create(
            beschreibung="Kundenzahlung Projekt A",
            betrag=2500.00,
            typ="Einnahme",
            kategorie=self.kategorie,
            datum=date(2026, 8, 15)
        )
        self.list_url = reverse("buchung-list")
        self.detail_url = reverse("buchung-detail", kwargs={"pk": self.buchung.pk})

    def test_get_buchungen_list(self):
        """Vérifie la liste des écritures comptables (GET)"""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["beschreibung"], "Kundenzahlung Projekt A")

    def test_create_buchung(self):
        """Vérifie la création d'une écriture comptable (POST)"""
        data = {
            "beschreibung": "Büromaterial",
            "betrag": -120.00,
            "typ": "Ausgabe",
            "kategorie": self.kategorie.id,
            "datum": "2026-08-16"
        }
        response = self.client.post(self.list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Buchung.objects.count(), 2)

    def test_update_buchung(self):
        """Vérifie la modification d'une écriture comptable (PUT)"""
        data = {
            "beschreibung": "Kundenzahlung Projekt A (Angepasst)",
            "betrag": 2800.00,
            "typ": "Einnahme",
            "kategorie": self.kategorie.id,
            "datum": "2026-08-15"
        }
        response = self.client.put(self.detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.buchung.refresh_from_db()
        self.assertEqual(self.buchung.beschreibung, "Kundenzahlung Projekt A (Angepasst)")

    def test_delete_buchung(self):
        """Vérifie la suppression d'une écriture comptable (DELETE)"""
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Buchung.objects.count(), 0)