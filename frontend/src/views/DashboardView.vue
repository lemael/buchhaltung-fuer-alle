<script setup lang="ts">
import { ref, defineComponent } from 'vue'


interface Buchung {
  id: number
  titel: string
  typ: 'Einnahme' | 'Ausgabe'
  betrag: number
}

// Données réactives pour le Dashboard
const einnahmen = ref(4250)
const ausgaben = ref(2180)
const saldo = ref(2070)

// Liste des dernières transactions
const letzteBuchungen = ref<Buchung[]>([
  { id: 1, titel: 'Kundenzahlung', typ: 'Einnahme', betrag: 2500 },
  { id: 2, titel: 'Büromaterial', typ: 'Ausgabe', betrag: 120 },
  { id: 3, titel: 'Internet', typ: 'Ausgabe', betrag: 49 },
])

// Formatage monétaire (€)
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val)
}

</script>

<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <!-- En-tête -->
      <div class="header">
        <h1>Finanzübersicht</h1>
        <p>Behalte deine Einnahmen und Ausgaben im Überblick.</p>
      </div>

      <!-- Cartes KPI (Einnahmen, Ausgaben, Saldo) -->
      <div class="kpi-grid">
        <div class="card kpi-card">
          <div class="kpi-label">Einnahmen</div>
          <div class="kpi-value">{{ formatCurrency(einnahmen) }}</div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-label">Ausgaben</div>
          <div class="kpi-value">{{ formatCurrency(ausgaben) }}</div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-label">Saldo</div>
          <div class="kpi-value">{{ formatCurrency(saldo) }}</div>
        </div>
      </div>

      <!-- Graphique SVG -->
      <div class="card chart-card">
        <div class="chart-header">
          <span class="chart-title">Finanzentwicklung</span>
          <div class="dropdown-button">
            <span>Zeitraum</span>
            <i class="ti ti-chevron-down"></i>
          </div>
        </div>

        <div class="chart-wrapper">
          <svg viewBox="0 0 700 260" class="chart-svg">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6366f1" stop-opacity="0.15" />
                <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
              </linearGradient>
            </defs>

            <!-- Lignes de grille et axes Y -->
            <text x="0" y="18" class="axis-text">4.000 €</text>
            <line x1="72" y1="14" x2="700" y2="14" class="grid-line" />

            <text x="0" y="72" class="axis-text">3.000 €</text>
            <line x1="72" y1="68" x2="700" y2="68" class="grid-line" />

            <text x="0" y="126" class="axis-text">2.000 €</text>
            <line x1="72" y1="122" x2="700" y2="122" class="grid-line" />

            <text x="0" y="180" class="axis-text">1.000 €</text>
            <line x1="72" y1="176" x2="700" y2="176" class="grid-line" />

            <text x="0" y="234" class="axis-text">0 €</text>
            <line x1="72" y1="230" x2="700" y2="230" class="grid-line" />

            <!-- Labels X -->
            <text x="100" y="252" class="axis-text" text-anchor="middle">Jan</text>
            <text x="208" y="252" class="axis-text" text-anchor="middle">Feb</text>
            <text x="316" y="252" class="axis-text" text-anchor="middle">Mär</text>
            <text x="424" y="252" class="axis-text" text-anchor="middle">Apr</text>
            <text x="532" y="252" class="axis-text" text-anchor="middle">Mai</text>
            <text x="640" y="252" class="axis-text" text-anchor="middle">Jun</text>

            <!-- Remplissage et Ligne -->
            <path d="M100,200 L208,155 L316,100 L424,95 L532,140 L640,130 L640,230 L100,230 Z" fill="url(#lineGrad)" />
            <polyline points="100,200 208,155 316,100 424,95 532,140 640,130" class="chart-line" />

            <!-- Points de données -->
            <circle cx="100" cy="200" r="4" class="chart-point" />
            <circle cx="208" cy="155" r="4" class="chart-point" />
            <circle cx="316" cy="100" r="4" class="chart-point" />
            <circle cx="424" cy="95" r="4" class="chart-point" />
            <circle cx="532" cy="140" r="4" class="chart-point" />
            <circle cx="640" cy="130" r="4" class="chart-point" />
          </svg>
        </div>
      </div>

      <!-- Dernières transactions -->
      <div class="card table-card">
        <div class="table-header">
          <span class="table-title">Letzte Buchungen</span>
          <RouterLink to="/buchungen" class="link-action">Alle anzeigen</RouterLink>
        </div>

        <div
          v-for="(item, index) in letzteBuchungen"
          :key="item.id"
          class="table-row"
          :class="{ 'alt-bg': index % 2 !== 0 }"
        >
          <span class="row-title">{{ item.titel }}</span>
          <span class="row-type">{{ item.typ }}</span>
          <span class="row-amount">
            {{ item.typ === 'Einnahme' ? '+' : '-' }}{{ formatCurrency(item.betrag) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css');

.dashboard-container {
  min-height: 100vh;
  padding: 32px;
  background-color: var(--color-background-subtle);
  font-family: var(--font-family-base);
}

.header h1 {
  margin: 0 0 8px 0;
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-h1);
}

.header p {
  margin: 0 0 40px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 20px;
}

.card {
  background-color: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}



.link-action {
  font-size: 13px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-decoration: none;
  cursor: pointer;
}

/* KPI Cards */
.kpi-grid {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.kpi-card {
  flex: 1;
  padding: 28px;
}

.kpi-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 16px;
}

.kpi-value {
  font-size: 28px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

/* Chart */
.chart-card {
  padding: 28px;
  margin-bottom: 32px;
}

.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.dropdown-button {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  background-color: #ffffff;
}

.dropdown-button span {
  font-size: 13px;
  color: #374151;
  font-weight: 500;
}

.chart-wrapper {
  width: 100%;
  overflow-x: auto;
}

.chart-svg {
  width: 100%;
  min-width: 320px;
  height: 260px;
}

.axis-text {
  font-size: 12px;
  fill: #9ca3af;
  font-family: 'Inter', sans-serif;
}

.grid-line {
  stroke: #e5e7eb;
  stroke-width: 1;
}

.chart-line {
  fill: none;
  stroke: #6366f1;
  stroke-width: 2.5;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.chart-point {
  fill: #6366f1;
  stroke: #ffffff;
  stroke-width: 2;
}

/* Table */
.table-card {
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  border-bottom: 1px solid #e5e7eb;
}

.table-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.link-action {
  font-size: 13px;
  font-weight: 500;
  color: #6366f1;
  text-decoration: none;
  cursor: pointer;
}

.table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 28px;
  border-bottom: 1px solid #f3f4f6;
}

.table-row:last-child {
  border-bottom: none;
}

.alt-bg {
  background-color: #f9fafb;
}

.row-title {
  font-size: 14px;
  color: #111827;
}

.row-type {
  font-size: 14px;
  color: #6b7280;
}

.row-amount {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

/* Responsive */
@media (max-width: 640px) {
  .dashboard-container {
    padding: 16px;
  }

  .kpi-grid {
    flex-direction: column;
  }
}
</style>