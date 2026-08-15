<script setup lang="ts">
interface StrukturElement {
  name: string
  beschreibung: string
  beispiel?: string
}

const struktur: StrukturElement[] = [
  {
    name: 'config/',
    beschreibung:
      'Zentrale Django-Konfiguration des Projekts, einschließlich Einstellungen, URL-Routing und WSGI/ASGI-Konfiguration.',
    beispiel: 'settings.py, urls.py, asgi.py, wsgi.py',
  },
  {
    name: 'apps/',
    beschreibung:
      'Fachliche Django-Anwendungen. Jede App kapselt einen klar abgegrenzten Geschäftsbereich.',
    beispiel: 'buchhaltung/, benutzer/, kategorien/',
  },
  {
    name: 'models/',
    beschreibung: 'Definition der Datenmodelle und Beziehungen zwischen den Entitäten.',
    beispiel: 'Buchung, Kategorie, Benutzer',
  },
  {
    name: 'serializers/',
    beschreibung: 'Konvertierung und Validierung von Django-Modellen für die REST-API.',
    beispiel: 'BuchungSerializer, KategorieSerializer',
  },
  {
    name: 'views/',
    beschreibung: 'Implementierung der API-Endpunkte und Verarbeitung eingehender HTTP-Anfragen.',
    beispiel: 'BuchungViewSet, KategorieViewSet',
  },
  {
    name: 'services/',
    beschreibung: 'Kapselung komplexer Geschäftslogik außerhalb der API-Views.',
    beispiel: 'BuchungService, StatistikService',
  },
  {
    name: 'tests/',
    beschreibung: 'Automatisierte Tests für Models, Services und REST-API-Endpunkte.',
    beispiel: 'test_models.py, test_api.py',
  },
]
</script>

<template>
  <section class="backend-structure">
    <!-- Header -->
    <div class="section-header">
      <div class="section-icon">⚙️</div>

      <div>
        <h2>Backend-Struktur</h2>

        <p>Aufbau und Verantwortlichkeiten der Django-Anwendung.</p>
      </div>
    </div>

    <!-- Technologie-Stack -->
    <div class="content-card">
      <h3>Technologie-Stack</h3>

      <div class="technology-grid">
        <div class="technology">
          <span class="technology-label"> Framework </span>

          <strong>Django</strong>
        </div>

        <div class="technology">
          <span class="technology-label"> API </span>

          <strong>Django REST Framework</strong>
        </div>

        <div class="technology">
          <span class="technology-label"> Programmiersprache </span>

          <strong>Python</strong>
        </div>

        <div class="technology">
          <span class="technology-label"> Datenbank </span>

          <strong>PostgreSQL</strong>
        </div>

        <div class="technology">
          <span class="technology-label"> Authentifizierung </span>

          <strong>Token / JWT</strong>
        </div>

        <div class="technology">
          <span class="technology-label"> API-Format </span>

          <strong>REST / JSON</strong>
        </div>
      </div>
    </div>

    <!-- Projektstruktur -->
    <div class="content-card">
      <h3>Projektstruktur</h3>

      <pre><code>backend/
├── manage.py
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── apps/
│   ├── buchhaltung/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── services.py
│   │   └── tests.py
│   │
│   ├── kategorien/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── tests.py
│   │
│   └── benutzer/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       └── tests.py
│
├── requirements.txt
├── .env
├── Dockerfile
└── pytest.ini</code></pre>
    </div>

    <!-- Verantwortlichkeiten -->
    <div class="content-card">
      <h3>Verantwortlichkeiten der Verzeichnisse</h3>

      <div class="structure-list">
        <div v-for="element in struktur" :key="element.name" class="structure-item">
          <div class="structure-name">
            {{ element.name }}
          </div>

          <div class="structure-description">
            <p>
              {{ element.beschreibung }}
            </p>

            <code v-if="element.beispiel">
              {{ element.beispiel }}
            </code>
          </div>
        </div>
      </div>
    </div>

    <!-- Architektur -->
    <div class="content-card">
      <h3>Backend-Architektur</h3>

      <div class="architecture-flow">
        <div class="architecture-box">
          <span>HTTP Request</span>
          <small>Client-Anfrage</small>
        </div>

        <div class="arrow">→</div>

        <div class="architecture-box">
          <span>URL Routing</span>
          <small>Endpunkt</small>
        </div>

        <div class="arrow">→</div>

        <div class="architecture-box">
          <span>View / ViewSet</span>
          <small>Request-Verarbeitung</small>
        </div>

        <div class="arrow">→</div>

        <div class="architecture-box">
          <span>Service</span>
          <small>Geschäftslogik</small>
        </div>

        <div class="arrow">→</div>

        <div class="architecture-box">
          <span>Model / ORM</span>
          <small>Datenzugriff</small>
        </div>

        <div class="arrow">→</div>

        <div class="architecture-box">
          <span>PostgreSQL</span>
          <small>Datenbank</small>
        </div>
      </div>
    </div>

    <!-- API -->
    <div class="content-card">
      <h3>REST-API</h3>

      <p class="card-description">
        Das Backend stellt eine REST-Schnittstelle bereit, über die das Vue-Frontend auf die
        Geschäftsdaten zugreifen und diese verändern kann.
      </p>

      <div class="api-list">
        <div class="api-row">
          <span class="method get"> GET </span>

          <code>/api/buchungen/</code>

          <span> Buchungen abrufen </span>
        </div>

        <div class="api-row">
          <span class="method post"> POST </span>

          <code>/api/buchungen/</code>

          <span> Neue Buchung erstellen </span>
        </div>

        <div class="api-row">
          <span class="method put"> PUT </span>

          <code>/api/buchungen/{id}/</code>

          <span> Buchung aktualisieren </span>
        </div>

        <div class="api-row">
          <span class="method delete"> DELETE </span>

          <code>/api/buchungen/{id}/</code>

          <span> Buchung löschen </span>
        </div>

        <div class="api-row">
          <span class="method get"> GET </span>

          <code>/api/kategorien/</code>

          <span> Kategorien abrufen </span>
        </div>
      </div>
    </div>

    <!-- Datenmodell -->
    <div class="content-card">
      <h3>Datenmodell</h3>

      <div class="data-model">
        <div class="model-box">
          <div class="model-header">📄 Buchung</div>

          <ul>
            <li>id</li>
            <li>datum</li>
            <li>beschreibung</li>
            <li>betrag</li>
            <li>typ</li>
            <li>kategorie</li>
          </ul>
        </div>

        <div class="relation">N : 1</div>

        <div class="model-box">
          <div class="model-header">🏷️ Kategorie</div>

          <ul>
            <li>id</li>
            <li>name</li>
            <li>beschreibung</li>
          </ul>
        </div>
      </div>

      <p class="model-description">
        Eine Buchung wird genau einer Kategorie zugeordnet. Dadurch können Einnahmen und Ausgaben
        strukturiert kategorisiert und ausgewertet werden.
      </p>
    </div>

    <!-- Entwicklungsprinzipien -->
    <div class="content-card">
      <h3>Entwicklungsprinzipien</h3>

      <div class="principles">
        <div class="principle">
          <span>01</span>

          <div>
            <strong> Trennung der Verantwortlichkeiten </strong>

            <p>API-Logik, Geschäftslogik und Datenzugriff werden voneinander getrennt.</p>
          </div>
        </div>

        <div class="principle">
          <span>02</span>

          <div>
            <strong> REST-Architektur </strong>

            <p>
              Die Kommunikation zwischen Frontend und Backend erfolgt über klar definierte
              REST-Endpunkte.
            </p>
          </div>
        </div>

        <div class="principle">
          <span>03</span>

          <div>
            <strong> Datenvalidierung </strong>

            <p>
              Eingehende Daten werden vor der Verarbeitung validiert und auf ihre Konsistenz
              geprüft.
            </p>
          </div>
        </div>

        <div class="principle">
          <span>04</span>

          <div>
            <strong> Testbarkeit </strong>

            <p>Geschäftslogik und API-Endpunkte werden durch automatisierte Tests überprüft.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.backend-structure {
  width: 100%;
}

/* =========================
   HEADER
========================= */

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  border-radius: 10px;

  background: #f0fdf4;

  font-size: 22px;
}

.section-header h2 {
  margin: 0 0 4px;

  color: #0f172a;

  font-size: 24px;
}

.section-header p {
  margin: 0;

  color: #64748b;

  font-size: 14px;
}

/* =========================
   CARD
========================= */

.content-card {
  margin-bottom: 20px;
  padding: 24px;

  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 12px;
}

.content-card h3 {
  margin: 0 0 20px;

  color: #0f172a;

  font-size: 17px;
}

.card-description {
  margin: -8px 0 20px;

  color: #64748b;

  font-size: 14px;

  line-height: 1.6;
}

/* =========================
   TECHNOLOGY
========================= */

.technology-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 12px;
}

.technology {
  display: flex;
  flex-direction: column;

  gap: 5px;

  padding: 14px;

  background: #f8fafc;

  border-radius: 8px;
}

.technology-label {
  color: #64748b;

  font-size: 12px;
}

.technology strong {
  color: #0f172a;

  font-size: 14px;
}

/* =========================
   CODE
========================= */

pre {
  overflow-x: auto;

  margin: 0;
  padding: 20px;

  background: #0f172a;

  border-radius: 8px;

  color: #e2e8f0;

  font-size: 13px;

  line-height: 1.6;
}

/* =========================
   STRUCTURE
========================= */

.structure-list {
  display: flex;
  flex-direction: column;
}

.structure-item {
  display: grid;

  grid-template-columns: 180px 1fr;

  gap: 20px;

  padding: 16px 0;

  border-bottom: 1px solid #f1f5f9;
}

.structure-item:last-child {
  border-bottom: none;
}

.structure-name {
  color: #16a34a;

  font-family: monospace;

  font-size: 14px;

  font-weight: 600;
}

.structure-description p {
  margin: 0 0 8px;

  color: #475569;

  font-size: 14px;

  line-height: 1.6;
}

.structure-description code {
  padding: 4px 7px;

  background: #f1f5f9;

  border-radius: 4px;

  color: #475569;

  font-size: 12px;
}

/* =========================
   ARCHITECTURE
========================= */

.architecture-flow {
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  flex-wrap: wrap;
}

.architecture-box {
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 4px;

  min-width: 105px;

  padding: 14px;

  background: #f0fdf4;

  border: 1px solid #dcfce7;

  border-radius: 8px;

  text-align: center;
}

.architecture-box span {
  color: #15803d;

  font-size: 12px;

  font-weight: 600;
}

.architecture-box small {
  color: #64748b;

  font-size: 10px;
}

.arrow {
  color: #94a3b8;

  font-size: 18px;
}

/* =========================
   API
========================= */

.api-list {
  display: flex;
  flex-direction: column;

  gap: 6px;
}

.api-row {
  display: grid;

  grid-template-columns: 70px 220px 1fr;

  align-items: center;

  gap: 12px;

  padding: 11px 12px;

  background: #f8fafc;

  border-radius: 7px;

  color: #64748b;

  font-size: 13px;
}

.api-row code {
  color: #334155;

  font-family: monospace;

  font-size: 12px;
}

.method {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  width: 55px;

  padding: 4px 6px;

  border-radius: 4px;

  font-family: monospace;

  font-size: 11px;

  font-weight: 700;
}

.method.get {
  background: #dbeafe;
  color: #1d4ed8;
}

.method.post {
  background: #dcfce7;
  color: #15803d;
}

.method.put {
  background: #fef3c7;
  color: #b45309;
}

.method.delete {
  background: #fee2e2;
  color: #dc2626;
}

/* =========================
   DATA MODEL
========================= */

.data-model {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 20px;
}

.model-box {
  min-width: 180px;

  overflow: hidden;

  background: #f8fafc;

  border: 1px solid #e2e8f0;

  border-radius: 8px;
}

.model-header {
  padding: 11px 14px;

  background: #f1f5f9;

  color: #334155;

  font-size: 13px;

  font-weight: 600;
}

.model-box ul {
  margin: 0;
  padding: 12px 28px;

  color: #64748b;

  font-family: monospace;

  font-size: 12px;

  line-height: 1.8;
}

.relation {
  color: #16a34a;

  font-family: monospace;

  font-size: 12px;

  font-weight: 700;
}

.model-description {
  margin: 18px 0 0;

  color: #64748b;

  font-size: 13px;

  line-height: 1.6;

  text-align: center;
}

/* =========================
   PRINCIPLES
========================= */

.principles {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 16px;
}

.principle {
  display: flex;

  gap: 14px;

  padding: 16px;

  background: #f8fafc;

  border-radius: 8px;
}

.principle > span {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  flex-shrink: 0;

  background: #dcfce7;

  border-radius: 6px;

  color: #15803d;

  font-size: 11px;

  font-weight: 700;
}

.principle strong {
  color: #334155;

  font-size: 14px;
}

.principle p {
  margin: 5px 0 0;

  color: #64748b;

  font-size: 13px;

  line-height: 1.5;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {
  .technology-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .api-row {
    grid-template-columns: 65px 1fr;
  }

  .api-row > span:last-child {
    grid-column: 2;
  }
}

@media (max-width: 700px) {
  .principles {
    grid-template-columns: 1fr;
  }

  .structure-item {
    grid-template-columns: 1fr;

    gap: 8px;
  }

  .data-model {
    flex-direction: column;
  }

  .relation {
    transform: rotate(90deg);
  }
}

@media (max-width: 500px) {
  .technology-grid {
    grid-template-columns: 1fr;
  }

  .content-card {
    padding: 18px;
  }

  .architecture-flow {
    flex-direction: column;
  }

  .arrow {
    transform: rotate(90deg);
  }
}
</style>
