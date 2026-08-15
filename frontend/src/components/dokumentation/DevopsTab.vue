<script setup lang="ts">
interface DevOpsBereich {
  name: string
  beschreibung: string
  beispiel: string
}

const devopsBereiche: DevOpsBereich[] = [
  {
    name: 'Containerisierung',
    beschreibung:
      'Frontend, Backend und Datenbank werden in voneinander getrennten Containern betrieben.',
    beispiel: 'Docker & Docker Compose',
  },
  {
    name: 'Versionsverwaltung',
    beschreibung:
      'Quellcode und Änderungen werden über Git versioniert und nachvollziehbar dokumentiert.',
    beispiel: 'Git & GitHub',
  },
  {
    name: 'CI/CD',
    beschreibung: 'Build-, Test- und Deployment-Prozesse werden automatisiert ausgeführt.',
    beispiel: 'GitHub Actions',
  },
  {
    name: 'Codequalität',
    beschreibung:
      'Automatisierte Prüfungen stellen Codequalität, Formatierung und Typsicherheit sicher.',
    beispiel: 'ESLint, Oxlint, Prettier, TypeScript',
  },
  {
    name: 'Testing',
    beschreibung:
      'Automatisierte Tests werden in die Entwicklungs- und Integrationsprozesse eingebunden.',
    beispiel: 'Vitest & Playwright',
  },
  {
    name: 'Deployment',
    beschreibung: 'Die Anwendung wird automatisiert auf einer Cloud-Plattform bereitgestellt.',
    beispiel: 'Railway / Docker',
  },
]
</script>

<template>
  <section class="devops-tab">
    <!-- Header -->
    <div class="section-header">
      <div class="section-icon">🚀</div>

      <div>
        <h2>DevOps & Deployment</h2>

        <p>Automatisierung, Qualitätssicherung und Bereitstellung der Anwendung.</p>
      </div>
    </div>

    <!-- Technologie-Stack -->
    <div class="content-card">
      <h3>DevOps-Technologien</h3>

      <div class="technology-grid">
        <div class="technology">
          <span class="technology-label"> Containerisierung </span>

          <strong>Docker</strong>
        </div>

        <div class="technology">
          <span class="technology-label"> Orchestrierung </span>

          <strong>Docker Compose</strong>
        </div>

        <div class="technology">
          <span class="technology-label"> Versionsverwaltung </span>

          <strong>Git & GitHub</strong>
        </div>

        <div class="technology">
          <span class="technology-label"> CI/CD </span>

          <strong>GitHub Actions</strong>
        </div>

        <div class="technology">
          <span class="technology-label"> Cloud </span>

          <strong>Railway</strong>
        </div>

        <div class="technology">
          <span class="technology-label"> Qualitätssicherung </span>

          <strong>ESLint / Oxlint / Prettier</strong>
        </div>
      </div>
    </div>

    <!-- Infrastruktur -->
    <div class="content-card">
      <h3>Containerisierte Infrastruktur</h3>

      <p class="card-description">
        Die einzelnen Komponenten der Anwendung werden voneinander getrennt und reproduzierbar über
        Docker bereitgestellt.
      </p>

      <div class="infrastructure">
        <div class="infra-column">
          <div class="infra-box frontend">
            <span class="infra-icon">🖥️</span>

            <strong>Frontend</strong>

            <small> Vue 3 + TypeScript </small>

            <code>frontend:3000</code>
          </div>
        </div>

        <div class="connection">↓</div>

        <div class="infra-column">
          <div class="infra-box backend">
            <span class="infra-icon">⚙️</span>

            <strong>Backend</strong>

            <small> Django REST API </small>

            <code>backend:8000</code>
          </div>
        </div>

        <div class="connection">↓</div>

        <div class="infra-column">
          <div class="infra-box database">
            <span class="infra-icon">🗄️</span>

            <strong>Datenbank</strong>

            <small> PostgreSQL </small>

            <code>database:5432</code>
          </div>
        </div>
      </div>
    </div>

    <!-- Docker -->
    <div class="content-card">
      <h3>Docker-Setup</h3>

      <pre><code>project/
│
├── frontend/
│   └── Dockerfile
│
├── backend/
│   └── Dockerfile
│
├── docker-compose.yml
│
└── .dockerignore</code></pre>

      <div class="docker-explanation">
        <div class="explanation-item">
          <strong>Dockerfile</strong>

          <p>
            Definiert die Umgebung und die Schritte, die zum Erstellen eines Containers notwendig
            sind.
          </p>
        </div>

        <div class="explanation-item">
          <strong>Docker Compose</strong>

          <p>Koordiniert Frontend, Backend und Datenbank als gemeinsame Entwicklungsumgebung.</p>
        </div>

        <div class="explanation-item">
          <strong>Reproduzierbare Umgebung</strong>

          <p>
            Alle Entwickler verwenden dieselbe technische Umgebung unabhängig vom lokalen
            Betriebssystem.
          </p>
        </div>
      </div>
    </div>

    <!-- CI/CD -->
    <div class="content-card">
      <h3>CI/CD-Pipeline</h3>

      <p class="card-description">
        Änderungen am Quellcode werden automatisch geprüft, getestet und anschließend für das
        Deployment vorbereitet.
      </p>

      <div class="pipeline">
        <div class="pipeline-step">
          <div class="step-number">1</div>

          <strong>Git Push</strong>

          <small> Änderung wird zu GitHub gepusht </small>
        </div>

        <div class="pipeline-arrow">→</div>

        <div class="pipeline-step">
          <div class="step-number">2</div>

          <strong>Build</strong>

          <small> Frontend und Backend werden gebaut </small>
        </div>

        <div class="pipeline-arrow">→</div>

        <div class="pipeline-step">
          <div class="step-number">3</div>

          <strong>Tests</strong>

          <small> Automatisierte Tests werden ausgeführt </small>
        </div>

        <div class="pipeline-arrow">→</div>

        <div class="pipeline-step">
          <div class="step-number">4</div>

          <strong>Qualitätsprüfung</strong>

          <small> Linting und Type-Checking </small>
        </div>

        <div class="pipeline-arrow">→</div>

        <div class="pipeline-step">
          <div class="step-number">5</div>

          <strong>Deployment</strong>

          <small> Bereitstellung in der Cloud </small>
        </div>
      </div>
    </div>

    <!-- Pipeline Beispiel -->
    <div class="content-card">
      <h3>GitHub Actions</h3>

      <pre><code>name: CI/CD

on:
  push:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Repository auschecken
        uses: actions/checkout@v4

      - name: Node.js einrichten
        uses: actions/setup-node@v4

      - name: Abhängigkeiten installieren
        run: npm ci

      - name: Type-Check
        run: npm run type-check

      - name: Linting
        run: npm run lint

      - name: Build
        run: npm run build</code></pre>
    </div>

    <!-- DevOps Bereiche -->
    <div class="content-card">
      <h3>DevOps-Bereiche</h3>

      <div class="devops-list">
        <div v-for="bereich in devopsBereiche" :key="bereich.name" class="devops-item">
          <div class="devops-icon">✓</div>

          <div class="devops-content">
            <strong>
              {{ bereich.name }}
            </strong>

            <p>
              {{ bereich.beschreibung }}
            </p>

            <code>
              {{ bereich.beispiel }}
            </code>
          </div>
        </div>
      </div>
    </div>

    <!-- Umgebungen -->
    <div class="content-card">
      <h3>Umgebungen</h3>

      <div class="environment-grid">
        <div class="environment development">
          <div class="environment-header">
            <span>🛠️</span>

            <strong>Development</strong>
          </div>

          <p>Lokale Entwicklungsumgebung für die tägliche Entwicklung und Fehlersuche.</p>

          <code> docker compose up </code>
        </div>

        <div class="environment production">
          <div class="environment-header">
            <span>☁️</span>

            <strong>Production</strong>
          </div>

          <p>
            Produktive Umgebung für die Bereitstellung der Anwendung und den Zugriff durch Benutzer.
          </p>

          <code> Railway / Cloud </code>
        </div>
      </div>
    </div>

    <!-- Prinzipien -->
    <div class="content-card">
      <h3>DevOps-Prinzipien</h3>

      <div class="principles">
        <div class="principle">
          <span>01</span>

          <div>
            <strong>Automatisierung</strong>

            <p>Wiederkehrende Build-, Test- und Deployment-Prozesse werden automatisiert.</p>
          </div>
        </div>

        <div class="principle">
          <span>02</span>

          <div>
            <strong>Reproduzierbarkeit</strong>

            <p>Docker ermöglicht reproduzierbare Entwicklungs- und Produktionsumgebungen.</p>
          </div>
        </div>

        <div class="principle">
          <span>03</span>

          <div>
            <strong>Continuous Integration</strong>

            <p>Änderungen werden kontinuierlich integriert und automatisch überprüft.</p>
          </div>
        </div>

        <div class="principle">
          <span>04</span>

          <div>
            <strong>Continuous Delivery</strong>

            <p>
              Eine erfolgreiche Version kann automatisiert für die Bereitstellung vorbereitet
              werden.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.devops-tab {
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

  background: #fff7ed;

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
   INFRASTRUCTURE
========================= */

.infrastructure {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 12px;
}

.infra-box {
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 6px;

  width: 170px;

  padding: 18px;

  border-radius: 10px;

  text-align: center;
}

.infra-box.frontend {
  background: #eff6ff;
  border: 1px solid #dbeafe;
}

.infra-box.backend {
  background: #f0fdf4;
  border: 1px solid #dcfce7;
}

.infra-box.database {
  background: #faf5ff;
  border: 1px solid #f3e8ff;
}

.infra-icon {
  font-size: 24px;
}

.infra-box strong {
  color: #334155;

  font-size: 14px;
}

.infra-box small {
  color: #64748b;

  font-size: 11px;
}

.infra-box code {
  padding: 3px 6px;

  background: white;

  border-radius: 4px;

  color: #64748b;

  font-size: 10px;
}

.connection {
  color: #94a3b8;

  font-size: 20px;
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
   DOCKER EXPLANATION
========================= */

.docker-explanation {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 12px;

  margin-top: 18px;
}

.explanation-item {
  padding: 14px;

  background: #f8fafc;

  border-radius: 8px;
}

.explanation-item strong {
  color: #334155;

  font-size: 13px;
}

.explanation-item p {
  margin: 6px 0 0;

  color: #64748b;

  font-size: 12px;

  line-height: 1.5;
}

/* =========================
   PIPELINE
========================= */

.pipeline {
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  overflow-x: auto;

  padding: 10px 0;
}

.pipeline-step {
  display: flex;
  flex-direction: column;

  align-items: center;

  min-width: 115px;

  padding: 14px 10px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;

  border-radius: 8px;

  text-align: center;
}

.step-number {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  margin-bottom: 8px;

  border-radius: 50%;

  background: #fff7ed;

  color: #ea580c;

  font-size: 12px;

  font-weight: 700;
}

.pipeline-step strong {
  color: #334155;

  font-size: 12px;
}

.pipeline-step small {
  margin-top: 4px;

  color: #94a3b8;

  font-size: 10px;

  line-height: 1.4;
}

.pipeline-arrow {
  color: #94a3b8;

  font-size: 18px;
}

/* =========================
   DEVOPS LIST
========================= */

.devops-list {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 12px;
}

.devops-item {
  display: flex;

  gap: 12px;

  padding: 16px;

  background: #f8fafc;

  border-radius: 8px;
}

.devops-icon {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  flex-shrink: 0;

  background: #ffedd5;

  border-radius: 6px;

  color: #ea580c;

  font-size: 12px;

  font-weight: 700;
}

.devops-content strong {
  color: #334155;

  font-size: 14px;
}

.devops-content p {
  margin: 5px 0 8px;

  color: #64748b;

  font-size: 12px;

  line-height: 1.5;
}

.devops-content code {
  padding: 3px 6px;

  background: white;

  border-radius: 4px;

  color: #64748b;

  font-size: 10px;
}

/* =========================
   ENVIRONMENTS
========================= */

.environment-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 16px;
}

.environment {
  padding: 18px;

  border-radius: 8px;
}

.environment.development {
  background: #eff6ff;

  border: 1px solid #dbeafe;
}

.environment.production {
  background: #f0fdf4;

  border: 1px solid #dcfce7;
}

.environment-header {
  display: flex;

  align-items: center;

  gap: 8px;
}

.environment-header span {
  font-size: 18px;
}

.environment-header strong {
  color: #334155;

  font-size: 14px;
}

.environment p {
  margin: 10px 0;

  color: #64748b;

  font-size: 12px;

  line-height: 1.5;
}

.environment code {
  padding: 5px 8px;

  background: white;

  border-radius: 4px;

  color: #475569;

  font-size: 11px;
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

  background: #ffedd5;

  border-radius: 6px;

  color: #ea580c;

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

  .docker-explanation {
    grid-template-columns: 1fr;
  }

  .devops-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .environment-grid {
    grid-template-columns: 1fr;
  }

  .principles {
    grid-template-columns: 1fr;
  }

  .infrastructure {
    flex-direction: column;
  }

  .connection {
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
}
</style>
