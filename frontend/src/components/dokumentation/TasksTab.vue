<script setup lang="ts">
import { computed, ref } from 'vue'

type AufgabenStatus = 'offen' | 'in-bearbeitung' | 'erledigt'

interface Aufgabe {
  id: number
  titel: string
  beschreibung?: string
  status: AufgabenStatus
}

interface Projektphase {
  id: number
  titel: string
  beschreibung: string
  aufgaben: Aufgabe[]
}

const phasen = ref<Projektphase[]>([
  {
    id: 1,
    titel: 'Anforderungen & Konzeption',
    beschreibung: 'Anforderungen analysieren und die Projektstruktur definieren.',
    aufgaben: [
      {
        id: 1,
        titel: 'Lasten- und Pflichtenheft erstellen',
        status: 'erledigt',
      },
      {
        id: 2,
        titel: 'User Stories definieren',
        status: 'erledigt',
      },
      {
        id: 3,
        titel: 'Use-Case-Diagramm erstellen',
        status: 'erledigt',
      },
      {
        id: 4,
        titel: 'Datenmodell entwerfen',
        status: 'in-bearbeitung',
      },
      {
        id: 5,
        titel: 'Wireframes und UI-Mockups erstellen',
        status: 'offen',
      },
    ],
  },

  {
    id: 2,
    titel: 'Backend-Entwicklung',
    beschreibung: 'Django REST API und Datenbank implementieren.',
    aufgaben: [
      {
        id: 6,
        titel: 'Django-Projekt initialisieren',
        status: 'offen',
      },
      {
        id: 7,
        titel: 'PostgreSQL konfigurieren',
        status: 'offen',
      },
      {
        id: 8,
        titel: 'Buchungsmodell erstellen',
        status: 'offen',
      },
      {
        id: 9,
        titel: 'Kategorienmodell erstellen',
        status: 'offen',
      },
      {
        id: 10,
        titel: 'REST-API implementieren',
        status: 'offen',
      },
    ],
  },

  {
    id: 3,
    titel: 'Frontend-Entwicklung',
    beschreibung: 'Benutzeroberfläche mit Vue 3 und TypeScript entwickeln.',
    aufgaben: [
      {
        id: 11,
        titel: 'Vue-Projekt konfigurieren',
        status: 'offen',
      },
      {
        id: 12,
        titel: 'Anwendungs-Layout erstellen',
        status: 'offen',
      },
      {
        id: 13,
        titel: 'Dashboard entwickeln',
        status: 'offen',
      },
      {
        id: 14,
        titel: 'Buchungsverwaltung entwickeln',
        status: 'offen',
      },
      {
        id: 15,
        titel: 'API-Anbindung implementieren',
        status: 'offen',
      },
    ],
  },

  {
    id: 4,
    titel: 'Tests & Qualitätssicherung',
    beschreibung: 'Codequalität sicherstellen und automatisierte Tests erstellen.',
    aufgaben: [
      {
        id: 16,
        titel: 'Backend-Unit-Tests erstellen',
        status: 'offen',
      },
      {
        id: 17,
        titel: 'API-Tests erstellen',
        status: 'offen',
      },
      {
        id: 18,
        titel: 'Frontend-Komponententests erstellen',
        status: 'offen',
      },
      {
        id: 19,
        titel: 'End-to-End-Tests mit Playwright',
        status: 'offen',
      },
      {
        id: 20,
        titel: 'Type-Checking und Linting einrichten',
        status: 'offen',
      },
    ],
  },

  {
    id: 5,
    titel: 'DevOps & Deployment',
    beschreibung: 'Containerisierung, CI/CD und Bereitstellung der Anwendung.',
    aufgaben: [
      {
        id: 21,
        titel: 'Dockerfile für das Backend erstellen',
        status: 'offen',
      },
      {
        id: 22,
        titel: 'Dockerfile für das Frontend erstellen',
        status: 'offen',
      },
      {
        id: 23,
        titel: 'Docker Compose konfigurieren',
        status: 'offen',
      },
      {
        id: 24,
        titel: 'GitHub Actions konfigurieren',
        status: 'offen',
      },
      {
        id: 25,
        titel: 'Deployment vorbereiten',
        status: 'offen',
      },
    ],
  },
])

const alleAufgaben = computed(() => phasen.value.flatMap((phase) => phase.aufgaben))

const gesamtzahl = computed(() => alleAufgaben.value.length)

const erledigteAufgaben = computed(
  () => alleAufgaben.value.filter((aufgabe) => aufgabe.status === 'erledigt').length,
)

const aufgabenInBearbeitung = computed(
  () => alleAufgaben.value.filter((aufgabe) => aufgabe.status === 'in-bearbeitung').length,
)

const offeneAufgaben = computed(
  () => alleAufgaben.value.filter((aufgabe) => aufgabe.status === 'offen').length,
)

const fortschritt = computed(() => {
  if (gesamtzahl.value === 0) {
    return 0
  }

  return Math.round((erledigteAufgaben.value / gesamtzahl.value) * 100)
})

function statusAendern(aufgabe: Aufgabe) {
  if (aufgabe.status === 'offen') {
    aufgabe.status = 'in-bearbeitung'
  } else if (aufgabe.status === 'in-bearbeitung') {
    aufgabe.status = 'erledigt'
  } else {
    aufgabe.status = 'offen'
  }
}
</script>
<template>
  <section class="aufgaben-tab">
    <div class="section-header">
      <div>
        <h2>Projektaufgaben</h2>
        <p>Planung und Nachverfolgung der einzelnen Entwicklungsschritte.</p>
      </div>
    </div>

    <div class="progress-card">
      <div class="progress-header">
        <div>
          <span class="progress-title"> Projektfortschritt </span>

          <strong>{{ fortschritt }} %</strong>
        </div>

        <span class="progress-count"> {{ erledigteAufgaben }} / {{ gesamtzahl }} Aufgaben </span>
      </div>

      <div class="progress-bar">
        <div class="progress-value" :style="{ width: `${fortschritt}%` }" />
      </div>

      <div class="statistics">
        <span class="task-icon"
          ><img src="/green_circle_3d.png" alt="Erledigt" /> Erledigt: {{ erledigteAufgaben }}</span
        >
        <span class="task-icon"
          ><img src="/orange_circle_3d.png" alt="In Bearbeitung" /> In Bearbeitung:
          {{ aufgabenInBearbeitung }}</span
        >
        <span class="task-icon"
          ><img src="/white_circle_3d.png" alt="Offen" /> Offen: {{ offeneAufgaben }}</span
        >
      </div>
    </div>

    <div v-for="phase in phasen" :key="phase.id" class="phase-card">
      <div class="phase-header">
        <div>
          <h3>{{ phase.id }} - {{ phase.titel }}</h3>
          <p>{{ phase.beschreibung }}</p>
        </div>
      </div>

      <div class="task-list">
        <button
          v-for="aufgabe in phase.aufgaben"
          :key="aufgabe.id"
          class="task"
          :class="`task-${aufgabe.status}`"
          @click="statusAendern(aufgabe)"
        >
          <span class="task-status" :class="`status-${aufgabe.status}`">
            <span v-if="aufgabe.status === 'erledigt'"
              ><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="#1b9411"
                  d="M12 7a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7"
                />
              </svg>
            </span>

            <span v-else-if="aufgabe.status === 'in-bearbeitung'">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="#dc7216"
                  d="M12 7a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7"
                />
              </svg>
            </span>

            <span v-else
              ><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="#d7dad7"
                  d="M12 7a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7"
                /></svg
            ></span>
          </span>
          <span class="task-content">
            <strong>{{ aufgabe.titel }}</strong>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
<style scoped>
.task-icon img {
  width: 20px;
  height: auto;
  margin-right: 4px;
}
.task-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.task {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-status {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.task-status svg {
  display: block;
  width: 2em;
  height: 2em;
}

.task-content {
  display: flex;
  align-items: center;
}
.progress-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* En-tête */
.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.progress-header > div {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

.progress-header strong {
  font-size: 1.1rem;
  color: #1b9411;
}

.progress-count {
  font-size: 0.9rem;
  color: #6b7280;
}

/* Barre de progression */
.progress-bar {
  width: 100%;
  height: 10px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.progress-value {
  height: 100%;
  background: linear-gradient(90deg, #1b9411, #43b83a);
  border-radius: 999px;
  transition: width 0.4s ease;
}

/* Statistiques */
.statistics {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.task-icon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #4b5563;
}

.task-icon img {
  width: 22px;
  height: 22px;
  object-fit: contain;
  flex-shrink: 0;
}
</style>
