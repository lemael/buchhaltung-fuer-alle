<script setup lang="ts">
interface StrukturElement {
  name: string
  beschreibung: string
  beispiel?: string
}

const struktur: StrukturElement[] = [
  
  {
    name: 'layouts/',
    beschreibung:
      'Globale Layout-Komponenten, die als Wrapper für Views dienen und wiederkehrende UI-Elemente enthalten.',
    beispiel: 'DashboardLayout.vue',
  },
  
  {
    name: 'components/',
    beschreibung: 'Wiederverwendbare UI-Komponenten und fachliche Komponenten der Anwendung.',
    beispiel: 'BuchungForm.vue, BuchungTable.vue, StatistikCard.vue',
  },
  {
    name: 'views/',
    beschreibung:
      'Seiten bzw. Hauptansichten der Anwendung. Jede View bildet einen zentralen Anwendungsbereich ab.',
    beispiel: 'DashboardView.vue, BuchungenView.vue, DokumentationView.vue',
  },
  {
    name: 'stores/',
    beschreibung: 'Zentrale Verwaltung des Anwendungszustands mit Pinia.',
    beispiel: 'buchungen.ts, kategorien.ts, auth.ts',
  },
  {
    name: 'services/',
    beschreibung: 'Kapselung der Kommunikation mit dem Django-Backend und den REST-Schnittstellen.',
    beispiel: 'api.ts, buchungenService.ts',
  },
  {
    name: 'types/',
    beschreibung: 'Zentrale TypeScript-Typen und Interfaces für eine typsichere Entwicklung.',
    beispiel: 'Buchung.ts, Kategorie.ts, Benutzer.ts',
  },
  {
    name: 'router/',
    beschreibung: 'Definition und Verwaltung der Navigation innerhalb der Anwendung.',
    beispiel: 'index.ts',
  },
  {
    name: 'assets/',
    beschreibung: 'Statische Ressourcen wie CSS, Bilder, Icons und Schriftarten.',
    beispiel: 'main.css, logo.svg',
  },
]
</script>

<template>
  <section class="frontend-structure">
    <!-- Header -->
    <div class="section-header">
      <div class="section-icon">🖥️</div>

      <div>
        <h2>Frontend-Struktur</h2>
        <p>Aufbau und Verantwortlichkeiten der Vue.js-Anwendung.</p>
      </div>
    </div>

    <!-- Technologie-Stack -->
    <div class="content-card">
      <h3>Technologie-Stack</h3>

      <div class="technology-grid">
        <div class="technology">
          <span class="technology-label">Framework</span>
          <strong>Vue 3</strong>
        </div>

        <div class="technology">
          <span class="technology-label">Programmiersprache</span>
          <strong>TypeScript</strong>
        </div>

        <div class="technology">
          <span class="technology-label">State Management</span>
          <strong>Pinia</strong>
        </div>

        <div class="technology">
          <span class="technology-label">Routing</span>
          <strong>Vue Router</strong>
        </div>

        <div class="technology">
          <span class="technology-label">Build Tool</span>
          <strong>Vite</strong>
        </div>

        <div class="technology">
          <span class="technology-label">Testing</span>
          <strong>Vitest & Playwright</strong>
        </div>
      </div>
    </div>

    <!-- Projektstruktur -->
    <div class="content-card">
      <h3>Projektstruktur</h3>

      <pre><code>frontend/
├── public/
│
├── src/
│   ├── assets/
│   |   └── styles/
│   |        ├── theme.css
│   ├── layouts/
│   │   └── DashboardLayout.vue
│   ├── components/
│   │   ├── common/
│   │   ├── buchungen/
│   │   ├── kategorien/
│   │   └── dashboard/
│   │
|   |
│   ├── views/
│   │   ├── DashboardView.vue
│   │   ├── BuchungenView.vue
│   │   ├── KategorienView.vue
│   │   └── DokumentationView.vue
│   │
│   ├── stores/
│   │   ├── buchungen.ts
│   │   ├── kategorien.ts
│   │   └── auth.ts
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── types/
│   │   ├── Buchung.ts
│   │   ├── Kategorie.ts
│   │   └── Benutzer.ts
│   │
│   ├── router/
│   │   └── index.ts
│   │
│   ├── App.vue
│   └── main.ts
│
├── tests/
│
├── package.json
├── vite.config.ts
└── tsconfig.json</code></pre>
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
      <h3>Frontend-Architektur</h3>

      <div class="architecture-flow">
        <div class="architecture-box">
          <span>View</span>
          <small>Benutzeroberfläche</small>
        </div>
        <div class="arrow">→</div>

        <div class="architecture-box">
          <span>Component</span>
          <small>Wiederverwendbare UI</small>
        </div>

        <div class="arrow">→</div>

        <div class="architecture-box">
          <span>Pinia Store</span>
          <small>Anwendungszustand</small>
        </div>

        <div class="arrow">→</div>

        <div class="architecture-box">
          <span>API Service</span>
          <small>HTTP-Kommunikation</small>
        </div>

        <div class="arrow">→</div>

        <div class="architecture-box">
          <span>Django API</span>
          <small>Backend</small>
        </div>
      </div>
    </div>

    <!-- Entwicklungsprinzipien -->
    <div class="content-card">
      <h3>Entwicklungsprinzipien</h3>

      <div class="principles">
        <div class="principle">
          <span>01</span>
          <div>
            <strong>Komponentenbasierte Entwicklung</strong>
            <p>
              UI-Funktionalitäten werden in kleine und wiederverwendbare Vue-Komponenten aufgeteilt.
            </p>
          </div>
        </div>

        <div class="principle">
          <span>02</span>
          <div>
            <strong>Trennung der Verantwortlichkeiten</strong>
            <p>
              Views, Komponenten, Geschäftslogik, API-Kommunikation und Zustandsverwaltung werden
              klar voneinander getrennt.
            </p>
          </div>
        </div>

        <div class="principle">
          <span>03</span>
          <div>
            <strong>Typsicherheit</strong>
            <p>
              TypeScript wird verwendet, um Datenstrukturen, API-Antworten und
              Komponenten-Schnittstellen typsicher abzubilden.
            </p>
          </div>
        </div>

        <div class="principle">
          <span>04</span>
          <div>
            <strong>Wiederverwendbarkeit</strong>
            <p>
              Wiederkehrende UI-Elemente und Logiken werden zentral implementiert und mehrfach
              verwendet.
            </p>
          </div>
        </div>
      </div>
      <!-- Layout & Theme -->
      <div class="content-card">
        <div class="section-heading">
          <div>
            <h2>Layout & Theme</h2>
            <p>Gestaltungsrichtlinien und visuelle Grundlagen der Benutzeroberfläche.</p>
          </div>
        </div>

        <div class="theme-grid">
          <!-- Farben -->
          <article class="theme-card">
            <div class="theme-card-header">
              <span class="theme-icon">🎨</span>

              <div>
                <h3>Farbschema</h3>
                <p>Primär verwendete Farben der Anwendung.</p>
              </div>
            </div>

            <div class="color-list">
              <div class="color-item">
                <span class="color-preview color-primary"></span>

                <div>
                  <strong>Primärfarbe</strong>
                  <span>#2563EB</span>
                </div>
              </div>

              <div class="color-item">
                <span class="color-preview color-background"></span>

                <div>
                  <strong>Hintergrund</strong>
                  <span>#F8FAFC</span>
                </div>
              </div>

              <div class="color-item">
                <span class="color-preview color-text"></span>

                <div>
                  <strong>Text</strong>
                  <span>#1F2937</span>
                </div>
              </div>

              <div class="color-item">
                <span class="color-preview color-muted"></span>

                <div>
                  <strong>Sekundärer Text</strong>
                  <span>#6B7280</span>
                </div>
              </div>
            </div>
          </article>

          <!-- Typografie -->
          <article class="theme-card">
            <div class="theme-card-header">
              <span class="theme-icon">Aa</span>

              <div>
                <h3>Typografie</h3>
                <p>Schriftarten und Größenhierarchie.</p>
              </div>
            </div>

            <div class="typography-list">
              <div class="typography-item">
                <strong class="font-heading">Überschrift</strong>
                <span>1.25rem – 2rem / 700</span>
              </div>

              <div class="typography-item">
                <strong class="font-body">Fließtext</strong>
                <span>0.9rem – 1rem / 400</span>
              </div>

              <div class="typography-item">
                <strong class="font-small">Sekundärtext</strong>
                <span>0.75rem – 0.9rem / 400</span>
              </div>
            </div>
          </article>

          <!-- Abstände -->
          <article class="theme-card">
            <div class="theme-card-header">
              <span class="theme-icon">↔️</span>

              <div>
                <h3>Abstände</h3>
                <p>Einheitliches Spacing innerhalb der Komponenten.</p>
              </div>
            </div>

            <div class="spacing-list">
              <div class="spacing-item">
                <span>XS</span>
                <div class="spacing-bar spacing-xs"></div>
                <strong>4 px</strong>
              </div>

              <div class="spacing-item">
                <span>SM</span>
                <div class="spacing-bar spacing-sm"></div>
                <strong>8 px</strong>
              </div>

              <div class="spacing-item">
                <span>MD</span>
                <div class="spacing-bar spacing-md"></div>
                <strong>16 px</strong>
              </div>

              <div class="spacing-item">
                <span>LG</span>
                <div class="spacing-bar spacing-lg"></div>
                <strong>24 px</strong>
              </div>

              <div class="spacing-item">
                <span>XL</span>
                <div class="spacing-bar spacing-xl"></div>
                <strong>32 px</strong>
              </div>
            </div>
          </article>

          <!-- UI-Komponenten -->
          <article class="theme-card">
            <div class="theme-card-header">
              <span class="theme-icon">🧩</span>

              <div>
                <h3>UI-Komponenten</h3>
                <p>Wiederkehrende visuelle Komponenten.</p>
              </div>
            </div>

            <ul class="component-list">
              <li>Cards mit abgerundeten Ecken</li>
              <li>Buttons mit Hover-Zuständen</li>
              <li>Status-Badges</li>
              <li>Progress-Bars</li>
              <li>Responsive Grid-Layouts</li>
              <li>Sidebar-Navigation</li>
            </ul>
          </article>

          <!-- Responsive Design -->
          <article class="theme-card">
            <div class="theme-card-header">
              <span class="theme-icon">📱</span>

              <div>
                <h3>Responsive Design</h3>
                <p>Anpassung an unterschiedliche Bildschirmgrößen.</p>
              </div>
            </div>

            <div class="responsive-list">
              <div>
                <strong>Desktop</strong>
                <span>&gt; 900 px</span>
              </div>

              <div>
                <strong>Tablet</strong>
                <span>600 – 900 px</span>
              </div>

              <div>
                <strong>Mobile</strong>
                <span>&lt; 600 px</span>
              </div>
            </div>
          </article>

          <!-- Icons & Visuals -->
          <article class="theme-card">
            <div class="theme-card-header">
              <span class="theme-icon">✨</span>

              <div>
                <h3>Icons & Visuals</h3>
                <p>Visuelle Elemente zur Verbesserung der Benutzerführung.</p>
              </div>
            </div>

            <ul class="component-list">
              <li>Fluent Emoji für visuelle Hervorhebungen</li>
              <li>SVG-Icons für Statusanzeigen</li>
              <li>3D-Illustrationen für Technologie-Karten</li>
              <li>Semantische Farben für Status und Prioritäten</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.frontend-structure {
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

  background: #eff6ff;

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
  color: #2563eb;

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

  gap: 10px;

  flex-wrap: wrap;
}

.architecture-box {
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 4px;

  min-width: 110px;

  padding: 14px;

  background: #eff6ff;

  border: 1px solid #dbeafe;

  border-radius: 8px;

  text-align: center;
}

.architecture-box span {
  color: #2563eb;

  font-size: 13px;

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

  background: #dbeafe;

  border-radius: 6px;

  color: #2563eb;

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

@media (max-width: 800px) {
  .technology-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .principles {
    grid-template-columns: 1fr;
  }

  .structure-item {
    grid-template-columns: 1fr;

    gap: 8px;
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
  /* =========================================================
   LAYOUT & THEME
   ========================================================= */

.content-card .section-heading {
  margin-bottom: 24px;
}

.content-card .section-heading h2 {
  margin: 0 0 5px;

  color: #111827;

  font-size: 1.25rem;
  font-weight: 700;
}

.content-card .section-heading p {
  margin: 0;

  color: #6b7280;

  font-size: 0.88rem;
  line-height: 1.5;
}


/* =========================================================
   THEME GRID
   ========================================================= */

.theme-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}


/* =========================================================
   THEME CARD
   ========================================================= */

.theme-card {
  padding: 22px;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  background: #ffffff;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.theme-card:hover {
  border-color: #bfdbfe;

  box-shadow:
    0 8px 24px rgba(37, 99, 235, 0.07);

  transform: translateY(-2px);
}


/* =========================================================
   THEME CARD HEADER
   ========================================================= */

.theme-card-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  margin-bottom: 20px;
}

.theme-card-header h3 {
  margin: 0 0 4px;

  color: #111827;

  font-size: 0.98rem;
  font-weight: 700;
}

.theme-card-header p {
  margin: 0;

  color: #6b7280;

  font-size: 0.78rem;
  line-height: 1.5;
}


/* =========================================================
   THEME ICON
   ========================================================= */

.theme-icon {
  display: flex;
  flex-shrink: 0;

  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  border-radius: 10px;

  background: #eff6ff;
  color: #2563eb;

  font-size: 1.25rem;
  line-height: 1;
}


/* =========================================================
   FARBSCHEMA
   ========================================================= */

.color-list {
  display: grid;
  gap: 12px;
}

.color-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.color-preview {
  width: 34px;
  height: 34px;

  flex-shrink: 0;

  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.color-primary {
  background: #2563eb;
}

.color-background {
  background: #f8fafc;
}

.color-text {
  background: #1f2937;
}

.color-muted {
  background: #6b7280;
}

.color-item > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.color-item strong {
  color: #374151;

  font-size: 0.8rem;
  font-weight: 650;
}

.color-item div span {
  color: #9ca3af;

  font-family:
    "SFMono-Regular",
    Consolas,
    "Liberation Mono",
    monospace;

  font-size: 0.7rem;
}


/* =========================================================
   TYPOGRAFIE
   ========================================================= */

.typography-list {
  display: grid;
  gap: 0;
}

.typography-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 0;

  border-bottom: 1px solid #f1f5f9;
}

.typography-item:first-child {
  padding-top: 0;
}

.typography-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.typography-item span {
  color: #9ca3af;

  font-family:
    "SFMono-Regular",
    Consolas,
    "Liberation Mono",
    monospace;

  font-size: 0.68rem;
}

.font-heading {
  color: #111827;
  font-size: 1.1rem;
}

.font-body {
  color: #374151;
  font-size: 0.92rem;
}

.font-small {
  color: #6b7280;
  font-size: 0.78rem;
}


/* =========================================================
   ABSTÄNDE / SPACING
   ========================================================= */

.spacing-list {
  display: grid;
  gap: 13px;
}

.spacing-item {
  display: grid;
  grid-template-columns: 30px 1fr 45px;
  align-items: center;
  gap: 10px;

  color: #64748b;

  font-size: 0.72rem;
}

.spacing-item strong {
  color: #374151;

  font-family:
    "SFMono-Regular",
    Consolas,
    "Liberation Mono",
    monospace;

  font-size: 0.7rem;
  text-align: right;
}

.spacing-bar {
  height: 7px;

  border-radius: 999px;

  background: #2563eb;
}

.spacing-xs {
  width: 15%;
}

.spacing-sm {
  width: 25%;
}

.spacing-md {
  width: 45%;
}

.spacing-lg {
  width: 65%;
}

.spacing-xl {
  width: 85%;
}


/* =========================================================
   UI-KOMPONENTEN
   ========================================================= */

.component-list {
  display: grid;
  gap: 10px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.component-list li {
  position: relative;

  padding-left: 20px;

  color: #4b5563;

  font-size: 0.83rem;
  line-height: 1.5;
}

.component-list li::before {
  content: "";

  position: absolute;
  top: 0.55em;
  left: 4px;

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #2563eb;
}


/* =========================================================
   RESPONSIVE DESIGN
   ========================================================= */

.responsive-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.responsive-list > div {
  padding: 14px;

  border: 1px solid #f1f5f9;
  border-radius: 10px;

  background: #f8fafc;

  text-align: center;
}

.responsive-list strong {
  display: block;
  margin-bottom: 4px;

  color: #374151;

  font-size: 0.8rem;
}

.responsive-list span {
  color: #9ca3af;

  font-family:
    "SFMono-Regular",
    Consolas,
    "Liberation Mono",
    monospace;

  font-size: 0.68rem;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 850px) {
  .theme-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .content-card {
    padding: 20px;
  }

  .principle {
    grid-template-columns: 36px 1fr;
    gap: 12px;
  }

  .principle > span {
    width: 32px;
    height: 32px;
  }

  .responsive-list {
    grid-template-columns: 1fr;
  }

}
</style>
