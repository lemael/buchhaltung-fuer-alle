<script setup lang="ts">
interface Requirement {
  id: string
  title: string
  description: string
  priority: 'Hoch' | 'Mittel' | 'Niedrig'
}

const functionalRequirements: Requirement[] = [
  {
    id: 'F-01',
    title: 'Buchungen erfassen',
    description:
      'Der Benutzer kann Einnahmen und Ausgaben mit Betrag, Datum, Kategorie und Beschreibung erfassen.',
    priority: 'Hoch',
  },
  {
    id: 'F-02',
    title: 'Buchungen bearbeiten',
    description: 'Bereits erfasste Buchungen können nachträglich geändert und aktualisiert werden.',
    priority: 'Hoch',
  },
  {
    id: 'F-03',
    title: 'Buchungen löschen',
    description: 'Der Benutzer kann nicht mehr benötigte Buchungen löschen.',
    priority: 'Hoch',
  },
  {
    id: 'F-04',
    title: 'Buchungen filtern',
    description: 'Buchungen können nach Zeitraum, Typ und Kategorie gefiltert werden.',
    priority: 'Mittel',
  },
  {
    id: 'F-05',
    title: 'Kategorien verwalten',
    description: 'Der Benutzer kann Kategorien für Einnahmen und Ausgaben verwalten.',
    priority: 'Mittel',
  },
  {
    id: 'F-06',
    title: 'Finanzübersicht',
    description:
      'Die Anwendung zeigt eine Übersicht über Einnahmen, Ausgaben und den aktuellen Saldo.',
    priority: 'Hoch',
  },
  {
    id: 'F-07',
    title: 'Statistische Auswertung',
    description: 'Finanzielle Daten werden übersichtlich dargestellt und können analysiert werden.',
    priority: 'Mittel',
  },
]

const nonFunctionalRequirements: Requirement[] = [
  {
    id: 'NF-01',
    title: 'Benutzerfreundlichkeit',
    description: 'Die Anwendung soll eine intuitive und übersichtliche Benutzeroberfläche bieten.',
    priority: 'Hoch',
  },
  {
    id: 'NF-02',
    title: 'Responsives Design',
    description: 'Die Anwendung soll auf Desktop-, Tablet- und mobilen Geräten nutzbar sein.',
    priority: 'Mittel',
  },
  {
    id: 'NF-03',
    title: 'Performance',
    description: 'Seiten und Daten sollen möglichst schnell geladen und verarbeitet werden.',
    priority: 'Mittel',
  },
  {
    id: 'NF-04',
    title: 'Wartbarkeit',
    description: 'Der Quellcode soll modular, strukturiert und langfristig wartbar sein.',
    priority: 'Hoch',
  },
  {
    id: 'NF-05',
    title: 'Sicherheit',
    description:
      'Benutzerdaten und Schnittstellen sollen durch geeignete Sicherheitsmechanismen geschützt werden.',
    priority: 'Hoch',
  },
]

const projectGoals = [
  'Entwicklung einer einfachen webbasierten Buchhaltungsanwendung',
  'Trennung von Frontend und Backend über eine REST-API',
  'Strukturierte und wartbare Softwarearchitektur',
  'Automatisierte Tests und Qualitätssicherung',
  'Containerisierung und automatisiertes Deployment',
]
</script>

<template>
  <section class="requirements">
    <header class="page-header">
      <div>
        <span class="eyebrow">PROJEKTDOKUMENTATION</span>
        <h1>Anforderungskatalog</h1>
        <p>Funktionale und nicht-funktionale Anforderungen für die Buchhaltungsanwendung.</p>
      </div>
    </header>

    <!-- Projektziele -->
    <section class="documentation-section">
      <div class="section-heading">
        <span class="section-number">01</span>

        <div>
          <h2>Projektziele</h2>
          <p>Was soll mit der Anwendung erreicht werden?</p>
        </div>
      </div>

      <div class="goals-card">
        <ul>
          <li v-for="goal in projectGoals" :key="goal">
            <span class="check">✓</span>
            <span>{{ goal }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Funktionale Anforderungen -->
    <section class="documentation-section">
      <div class="section-heading">
        <span class="section-number">02</span>

        <div>
          <h2>Funktionale Anforderungen</h2>
          <p>Funktionen, die die Anwendung für den Benutzer bereitstellen soll.</p>
        </div>
      </div>

      <div class="requirements-list">
        <article
          v-for="requirement in functionalRequirements"
          :key="requirement.id"
          class="requirement-card"
        >
          <div class="requirement-header">
            <span class="requirement-id">{{ requirement.id }}</span>

            <span class="priority" :class="`priority-${requirement.priority.toLowerCase()}`">
              {{ requirement.priority }}
            </span>
          </div>

          <h3>{{ requirement.title }}</h3>
          <p>{{ requirement.description }}</p>
        </article>
      </div>
    </section>

    <!-- Nicht-funktionale Anforderungen -->
    <section class="documentation-section">
      <div class="section-heading">
        <span class="section-number">03</span>

        <div>
          <h2>Nicht-funktionale Anforderungen</h2>
          <p>Qualitätsanforderungen an die technische Umsetzung der Anwendung.</p>
        </div>
      </div>

      <div class="requirements-list">
        <article
          v-for="requirement in nonFunctionalRequirements"
          :key="requirement.id"
          class="requirement-card"
        >
          <div class="requirement-header">
            <span class="requirement-id">{{ requirement.id }}</span>

            <span class="priority" :class="`priority-${requirement.priority.toLowerCase()}`">
              {{ requirement.priority }}
            </span>
          </div>

          <h3>{{ requirement.title }}</h3>
          <p>{{ requirement.description }}</p>
        </article>
      </div>
    </section>

    <!-- Technischer Rahmen -->
    <section class="documentation-section">
      <div class="section-heading">
        <span class="section-number">04</span>

        <div>
          <h2>Technischer Rahmen</h2>
          <p>Technologien und technische Grundlagen des Projekts.</p>
        </div>
      </div>

      <div class="technology-grid">
        <div class="technology-card">
          <span class="technology-icon"><img src="/laptop_3d.png" alt="Frontend" /></span>
          <h3>Frontend</h3>
          <p>Vue 3, TypeScript, Pinia und Vue Router</p>
        </div>

        <div class="technology-card">
          <span class="technology-icon"><img src="/gear_3d.png" alt="Backend" /></span>
          <h3>Backend</h3>
          <p>Django und Django REST Framework</p>
        </div>

        <div class="technology-card">
          <span class="technology-icon"><img src="/file_cabinet_3d.png" alt="Datenbank" /></span>
          <h3>Datenbank</h3>
          <p>PostgreSQL</p>
        </div>

        <div class="technology-card">
          <span class="technology-icon"><img src="/rocket_3d.png" alt="DevOps" /></span>
          <h3>DevOps</h3>
          <p>Docker, GitHub Actions und Cloud Deployment</p>
        </div>
      </div>
    </section>
   
  </section>
</template>

<style scoped>
.requirements {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px;
  color: #1f2937;
}

.page-header {
  margin-bottom: 48px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 10px;
  color: #2563eb;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.page-header h1 {
  margin: 0 0 12px;
  color: #111827;
  font-size: 2rem;
}

.page-header p {
  max-width: 700px;
  margin: 0;
  color: #6b7280;
  line-height: 1.7;
}

.documentation-section {
  margin-bottom: 48px;
}

.section-heading {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.section-number {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 38px;
  border-radius: 8px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 0.8rem;
  font-weight: 700;
}

.section-heading h2 {
  margin: 0 0 4px;
  color: #111827;
  font-size: 1.25rem;
}

.section-heading p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.goals-card {
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
}

.goals-card ul {
  display: grid;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.goals-card li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  line-height: 1.5;
}

.check {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #dcfce7;
  color: #16a34a;
  font-size: 0.75rem;
  font-weight: 700;
}

.requirements-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.requirement-card {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
}

.requirement-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.requirement-id {
  color: #6b7280;
  font-family: monospace;
  font-size: 0.8rem;
  font-weight: 600;
}

.priority {
  padding: 4px 9px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
}

.priority-hoch {
  background: #fee2e2;
  color: #b91c1c;
}

.priority-mittel {
  background: #fef3c7;
  color: #b45309;
}

.priority-niedrig {
  background: #dcfce7;
  color: #15803d;
}

.requirement-card h3 {
  margin: 0 0 8px;
  color: #111827;
  font-size: 1rem;
}

.requirement-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.6;
}

.technology-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.technology-card {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
}

.technology-icon {
  display: block;
  margin-bottom: 12px;
  font-size: 1.5rem;
}

.technology-icon img {
  width: 40px;
  height: auto;
}
.technology-card h3 {
  margin: 0 0 6px;
  font-size: 0.95rem;
}

.technology-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.85rem;
  line-height: 1.5;
}

@media (max-width: 800px) {
  .requirements-list,
  .technology-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .requirements {
    padding: 20px;
  }
}
</style>
