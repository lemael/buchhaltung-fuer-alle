# 📊 Buchhaltung

> Moderne Fullstack-Webanwendung zur Verwaltung, Organisation und Analyse von Einnahmen und Ausgaben.

**Buchhaltung** ist eine webbasierte Fullstack-Anwendung, die grundlegende Buchhaltungsprozesse digital abbildet.

Das Projekt wurde mit einer klaren Trennung zwischen **Frontend, Backend und Datenbank** konzipiert. Die Benutzeroberfläche wird zunächst in **Figma** geplant und anschließend mit **Vue.js und TypeScript** umgesetzt. Das Backend stellt über **Django REST Framework** eine RESTful API bereit. Die Daten werden in **PostgreSQL** gespeichert.

Die gesamte Anwendung wird mit **Docker** containerisiert und kann lokal über **Docker Compose** gestartet werden. Das Deployment erfolgt cloudbasiert auf **Railway**.

---

## 🎯 Project Goals

Das Hauptziel des Projekts ist die Entwicklung einer realistischen Fullstack-Anwendung mit modernen Software-Engineering-Prinzipien.

Die Anwendung soll:

- Einnahmen und Ausgaben verwalten
- Finanztransaktionen kategorisieren
- Buchungen erstellen, bearbeiten und löschen
- Finanzdaten filtern und durchsuchen
- Einnahmen und Ausgaben analysieren
- einen aktuellen Saldo berechnen
- finanzielle Statistiken visualisieren
- eine klare und intuitive Benutzeroberfläche bereitstellen
- Frontend und Backend über eine REST API verbinden
- automatisiert getestet werden
- containerisiert betrieben werden
- automatisiert auf einer Cloud-Plattform deployed werden

Neben der Funktionalität liegt der Fokus insbesondere auf:

- Clean Code
- Maintainability
- Scalability
- Security
- Testability
- Separation of Concerns
- Type Safety
- API Design
- Database Design
- Containerization
- CI/CD
- Cloud Deployment

---

# 🏗️ System Architecture

Die Anwendung folgt einer klassischen **Client-Server-Architektur**.

```text
                         ┌─────────────────────────┐
                         │        Browser          │
                         │                         │
                         │   Vue.js + TypeScript   │
                         │         + Vite          │
                         └────────────┬────────────┘
                                      │
                                      │ HTTPS
                                      │ REST / JSON
                                      ▼
                         ┌─────────────────────────┐
                         │        Backend          │
                         │                         │
                         │       Django            │
                         │ Django REST Framework   │
                         │                         │
                         │ Business Logic          │
                         │ Validation              │
                         │ Authentication          │
                         └────────────┬────────────┘
                                      │
                                      │ Django ORM
                                      ▼
                         ┌─────────────────────────┐
                         │       PostgreSQL        │
                         │                         │
                         │   Relational Database   │
                         └─────────────────────────┘