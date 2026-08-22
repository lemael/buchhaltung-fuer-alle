<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Buchung } from '@/types/index'
import { RouterLink } from 'vue-router'
import { useBuchungenStore } from '@/stores/buchungen'

const buchungenStore = useBuchungenStore()
// Récupération réactive directe depuis le store Pinia
const buchungenListe = computed(() => buchungenStore.buchungen)

// Charger les Buchungen depuis le backend au chargement de la vue
onMounted(() => {
  if (buchungenStore.buchungen.length === 0) {
    buchungenStore.fetchBuchungen()
  }
})


// Auswahl des Jahres für die Anzeige (Dropdown)
  const selectedYear = ref<number>(new Date().getFullYear())
  // Extraktion von einzigartigen Jahren aus den Buchungen für die Dropdown-Auswahl
  const verfügbareJahre = computed(() => {
  const jahre = buchungenStore.buchungen.map((b) => new Date(b.datum).getFullYear())
  const uniqueJahre = Array.from(new Set(jahre)).sort((a, b) => b - a)
  
  // Si aucune donnée n'est encore chargée, inclure l'année courante par défaut
  if (uniqueJahre.length === 0) {
    return [new Date().getFullYear()]
  }
  return uniqueJahre
})

// Berechnung der Gesamteinnahmen
const berechneEinnahmen = () => {
  return buchungenListe.value
    .filter(buchung => buchung.typ === 'Einnahme')
    .reduce((acc, buchung) => acc + Math.abs(buchung.betrag), 0)
}

// Berechnung der Gesamtausgaben
const berechneAusgaben = () => {
  return buchungenListe.value
    .filter(buchung => buchung.typ === 'Ausgabe')
    .reduce((acc, buchung) => acc + Math.abs(buchung.betrag), 0)
}
// Données réactives pour le Dashboard
const einnahmen = computed(() => berechneEinnahmen())
const ausgaben = computed(() => berechneAusgaben())
// // Solde (Saldo = Einnahmen - Ausgaben)
const saldo = computed(() => einnahmen.value - ausgaben.value)

// Liste des dernières transactions
const letzteBuchungen = computed(() => {
  return buchungenListe.value
    .slice()
    .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime())
    .slice(0, 5)
})

// Formatage monétaire (€)
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val)
}

// Calcul des soldes mensuels (Jan-Jun de l'année en cours)
const monthlyData = computed(() => {
  const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
  const totals = new Array(12).fill(0)
  

  buchungenStore.buchungen.forEach((b) => {
    const d = new Date(b.datum)
    if (d.getFullYear() === Number(selectedYear.value)) {
      console.log(`Buchung: ${b.beschreibung}, Typ: ${b.typ}, Betrag: ${b.betrag}, Datum: ${b.datum}`, { year: d.getFullYear(), selectedYear: Number(selectedYear.value) })
      const monthIdx = d.getMonth()
      // Corriger < 6 par < 12 pour inclure Juillet à Décembre
      if (monthIdx >= 0 && monthIdx < 12) {
        const amount = Math.abs(Number(b.betrag))
        totals[monthIdx] += b.typ === 'Einnahme' ? amount : -amount
      }
    }
  })
  
  // Coordonnées X réparties sur les 12 mois (de 80px à 660px dans le SVG)
  const xCoords = [80, 132, 185, 237, 290, 342, 395, 447, 500, 552, 605, 657]
  
  // Échelle Y (0€ = y:230, 4.000€ = y:14)
  const maxVal = 4000
  const minY = 230
  const maxY = 14

  const points = totals.map((val, idx) => {
    const clampedVal = Math.max(0, Math.min(val, maxVal))
    const y = minY - (clampedVal / maxVal) * (minY - maxY)
    return { x: xCoords[idx], y, month: months[idx], val }
  })

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ')
  const firstPoint = points[0] ?? { x: 100, y: 230 }
  const lastPoint = points[points.length - 1] ?? { x: 640, y: 230 }

  const pathD = `M${firstPoint.x},${firstPoint.y} ` + 
    points.slice(1).map((p) => `L${p.x},${p.y}`).join(' ') + 
    ` L${lastPoint.x},230 L${firstPoint.x},230 Z`

  return { points, polylinePoints, pathD }
})
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
        <div class="year-select-wrapper">
           <select id="year-select" v-model="selectedYear" class="year-select">
              <option v-for="jahr in verfügbareJahre" :key="jahr" :value="jahr">
                    {{ jahr }}
              </option>
           </select>
          
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

            <!-- Labels X dynamiques -->
            <text 
              v-for="p in monthlyData.points" 
              :key="p.month" 
              :x="p.x" 
              y="252" 
              class="axis-text" 
              text-anchor="middle"
            >
              {{ p.month }}
            </text>

            <!-- Remplissage et Ligne dynamiques -->
            <path :d="monthlyData.pathD" fill="url(#lineGrad)" />
            <polyline :points="monthlyData.polylinePoints" class="chart-line" />

            <!-- Points de données dynamiques -->
            <circle 
              v-for="p in monthlyData.points" 
              :key="p.x" 
              :cx="p.x" 
              :cy="p.y" 
              r="4" 
              class="chart-point" 
            />
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
          <span class="row-title">{{ item.beschreibung }}</span>
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