<script setup lang="ts">
import { ref, computed } from 'vue'

interface Buchung {
  id: number
  datum: string
  beschreibung: string
  kategorie: string
  typ: 'Einnahme' | 'Ausgabe'
  betrag: number
}

// Filtres et recherche
const searchQuery = ref('')
const selectedType = ref('')
const selectedKategorie = ref('')

// Données fictives des réservations / écritures
const buchungen = ref<Buchung[]>([
  {
    id: 1,
    datum: '16.08.2026',
    beschreibung: 'Büromaterial',
    kategorie: 'Bürobedarf',
    typ: 'Ausgabe',
    betrag: -120,
  },
  {
    id: 2,
    datum: '16.08.2026',
    beschreibung: 'Büromaterial',
    kategorie: 'Bürobedarf',
    typ: 'Ausgabe',
    betrag: -120,
  },
  {
    id: 3,
    datum: '16.08.2026',
    beschreibung: 'Büromaterial',
    kategorie: 'Bürobedarf',
    typ: 'Ausgabe',
    betrag: -120,
  },
  {
    id: 4,
    datum: '15.08.2026',
    beschreibung: 'Kundenzahlung',
    kategorie: 'Dienstleistungen',
    typ: 'Einnahme',
    betrag: 2500,
  },
])

// Liste unique des catégories pour le menu déroulant
const kategorienListe = computed(() => {
  return Array.from(new Set(buchungen.value.map((b) => b.kategorie)))
})

// Filtrage réactif des éléments
const gefilterteBuchungen = computed(() => {
  return buchungen.value.filter((b) => {
    const matchesSearch =
      b.beschreibung.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      b.kategorie.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = !selectedType.value || b.typ === selectedType.value
    const matchesKategorie = !selectedKategorie.value || b.kategorie === selectedKategorie.value

    return matchesSearch && matchesType && matchesKategorie
  })
})

// Actions
const handleEdit = (id: number) => {
  console.log('Bearbeiten:', id)
}

const handleDelete = (id: number) => {
  buchungen.value = buchungen.value.filter((b) => b.id !== id)
}

const formatCurrency = (val: number) => {
  const formatted = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(Math.abs(val))
  return val > 0 ? `+${formatted}` : `-${formatted}`
}
</script>

<template>
  <div class="buchungen-container">
    <!-- Header & Action -->
    <div class="header-section">
      <div>
        <h1 class="page-title">Buchungen</h1>
        <p class="page-subtitle">Verwalte deine Einnahmen und Ausgaben.</p>
      </div>

      <RouterLink to="/buchungen/neu" class="btn-primary">
        + neue Buchung
      </RouterLink>
    </div>

    <!-- Filter & Suche Bar -->
    <div class="filter-bar">
      <!-- Search Input -->
      <div class="search-input">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buchungen suchen..."
        />
      </div>

      <!-- Select Typ -->
      <div class="select-wrapper">
        <select v-model="selectedType">
          <option value="">Alle Typen</option>
          <option value="Einnahme">Einnahme</option>
          <option value="Ausgabe">Ausgabe</option>
        </select>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      <!-- Select Kategorie -->
      <div class="select-wrapper">
        <select v-model="selectedKategorie">
          <option value="">Kategorie auswählen</option>
          <option v-for="kat in kategorienListe" :key="kat" :value="kat">
            {{ kat }}
          </option>
        </select>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <div class="table-header">
        <div class="col col-datum">Datum</div>
        <div class="col col-beschreibung">Beschreibung</div>
        <div class="col col-kategorie">Kategorie</div>
        <div class="col col-typ">Typ</div>
        <div class="col col-betrag">Betrag</div>
        <div class="col col-aktionen">Aktionen</div>
      </div>

      <div class="table-body">
        <div
          v-for="row in gefilterteBuchungen"
          :key="row.id"
          class="table-row"
        >
          <div class="col col-datum">{{ row.datum }}</div>
          <div class="col col-beschreibung">{{ row.beschreibung }}</div>
          <div class="col col-kategorie">{{ row.kategorie }}</div>
          <div class="col col-typ">{{ row.typ }}</div>
          <div
            class="col col-betrag"
            :class="{ 'text-green': row.betrag > 0, 'text-red': row.betrag < 0 }"
          >
            {{ formatCurrency(row.betrag) }}
          </div>
          <div class="col col-aktionen">
            <button class="icon-btn" title="Bearbeiten" @click="handleEdit(row.id)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button class="icon-btn text-danger" title="Löschen" @click="handleDelete(row.id)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="gefilterteBuchungen.length === 0" class="empty-state">
          Keine Buchungen gefunden.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.buchungen-container {
  padding: 32px 24px;
  max-width: 1080px;
  margin: 0 auto;
  font-family: var(--font-family-base);
}

/* Header */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.page-title {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  margin: 0;
}

.btn-primary {
  background-color: var(--color-primary);
  color: #ffffff;
  padding: 10px 24px;
  border-radius: 6px;
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-input {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 8px 12px;
  flex: 1;
  min-width: 240px;
  background-color: var(--color-surface);
}

.search-input input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  color: var(--color-text-primary);
}

.search-input input::placeholder {
  color: var(--color-text-secondary);
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-surface);
  min-width: 180px;
}

.select-wrapper select {
  appearance: none;
  width: 100%;
  padding: 8px 36px 8px 16px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--color-text-secondary);
  cursor: pointer;
  outline: none;
}

.chevron {
  position: absolute;
  right: 12px;
  width: 16px;
  height: 16px;
  pointer-events: none;
  stroke: var(--color-text-secondary);
}

.icon {
  width: 18px;
  height: 18px;
  stroke: var(--color-text-secondary);
}

/* Table */
.table-wrapper {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--color-surface);
}

.table-header {
  display: grid;
  grid-template-columns: 120px 2fr 1.5fr 1fr 1.2fr 100px;
  padding: 16px;
  background-color: var(--color-background-subtle);
  border-bottom: 1px solid var(--color-border);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  font-size: 14px;
}

.table-row {
  display: grid;
  grid-template-columns: 120px 2fr 1.5fr 1fr 1.2fr 100px;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
  align-items: center;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.table-row:last-child {
  border-bottom: none;
}

.col-betrag {
  font-weight: var(--font-weight-semibold);
}

.text-green {
  color: #16a34a;
}

.col-acciones {
  display: flex;
  gap: 12px;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
}

.icon-btn svg {
  width: 18px;
  height: 18px;
}

.icon-btn:hover {
  color: var(--color-text-primary);
}

.icon-btn.text-danger:hover {
  color: #dc2626;
}

.empty-state {
  padding: 32px;
  text-align: center;
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 100px 1fr 1fr 80px;
  }

  .col-kategorie,
  .col-typ {
    display: none;
  }

  .header-section {
    flex-direction: column;
    gap: 16px;
  }
}
</style>