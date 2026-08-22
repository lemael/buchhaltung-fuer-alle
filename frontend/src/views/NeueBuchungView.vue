<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBuchungenStore } from '@/stores/buchungen'
import { useKategorienStore } from '@/stores/kategorien'
import type { Kategorie } from '@/types/index'

const router = useRouter()

// Form State
const beschreibung = ref('')
const betrag = ref<number | null>(null)
const typ = ref<'Einnahme' | 'Ausgabe'>('Ausgabe')
const kategorie = ref('')
const datum = ref(new Date().toISOString().substring(0, 10)) // Format YYYY-MM-DD

const buchungenStore = useBuchungenStore()
const kategorienStore = useKategorienStore()
// Récupération réactive des catégories depuis le store
const kategorienListe = computed(() => kategorienStore.kategorien)

// Charger les catégories depuis le backend au chargement de la vue
onMounted(() => {
  if (kategorienStore.kategorien.length === 0) {
    kategorienStore.fetchKategorien()
  }
})

const handleSubmit = async () => {
  if (!beschreibung.value || !betrag.value) return

  const neubuchung = {
    id: Date.now(),
    beschreibung: beschreibung.value,
    betrag: typ.value === 'Ausgabe' ? -Math.abs(betrag.value) : Math.abs(betrag.value),
    typ: typ.value,
    kategorie: kategorie.value,
    datum: datum.value,
  }
  await buchungenStore.createBuchung({
    
      beschreibung: neubuchung.beschreibung,
      betrag: neubuchung.betrag,
      typ: neubuchung.typ,
      kategorie: neubuchung.kategorie,
      datum: neubuchung.datum,
    
  })
  console.log('Neue Buchung gespeichert:', neubuchung)
  
  // 
  router.push('/buchungen')
}

const handleCancel = () => {
  router.back()
}
</script>

<template>
  <div class="neue-buchung-container">
    <div class="neue-buchung-content">
      <!-- En-tête -->
      <h1 class="page-title">Neue Buchung</h1>
      <p class="page-subtitle">Erfasse eine neue Einnahme oder Ausgabe.</p>

      <form @submit.prevent="handleSubmit" class="form-grid">
        <!-- Beschreibung -->
        <div class="form-group">
          <label for="beschreibung" class="form-label">Beschreibung</label>
          <input
            id="beschreibung"
            v-model="beschreibung"
            type="text"
            placeholder="z. B. Büromaterial"
            class="form-input"
            required
          />
        </div>

        <!-- Betrag -->
        <div class="form-group">
          <label for="betrag" class="form-label">Betrag (€)</label>
          <div class="input-wrapper">
            <input
              id="betrag"
              v-model.number="betrag"
              type="number"
              step="0.01"
              placeholder="0,00 €"
              class="form-input"
              required
            />
          </div>
        </div>

        <!-- Typ (Einnahme / Ausgabe) -->
        <div class="form-group">
          <label class="form-label">Typ</label>
          <div class="type-selector">
            <button
              type="button"
              class="type-btn"
              :class="{ 'active-einnahme': typ === 'Einnahme' }"
              @click="typ = 'Einnahme'"
            >
              Einnahme
            </button>
            <button
              type="button"
              class="type-btn"
              :class="{ 'active-ausgabe': typ === 'Ausgabe' }"
              @click="typ = 'Ausgabe'"
            >
              Ausgabe
            </button>
          </div>
        </div>

        <!-- Kategorie -->
        <div class="form-group">
          <label for="kategorie" class="form-label">Kategorie</label>
          <div class="select-wrapper">
            <select id="kategorie" v-model="kategorie" class="form-input form-select" required>
              <option value="" disabled>Kategorie auswählen</option>
              <option v-for="kat in kategorienListe" :key="kat.id" :value="kat.name">
                {{ kat.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Datum -->
        <div class="form-group">
          <label for="datum" class="form-label">Datum</label>
          <input
            id="datum"
            v-model="datum"
            type="date"
            class="form-input"
            required
          />
        </div>

        <!-- Actions -->
        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="handleCancel">
            Abbrechen
          </button>
          <button type="submit" class="btn-submit">
            Speichern
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.neue-buchung-container {
  min-height: 100vh;
  padding: 40px;
  background-color: var(--color-surface);
  font-family: var(--font-family-base);
}

.neue-buchung-content {
  max-width: 600px;
}

.page-title {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 4px 0;
  line-height: var(--line-height-h1);
}

.page-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0 0 32px 0;
  line-height: 20px;
}

/* Form layout */
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 16px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: 24px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  font-size: 15px;
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.15s ease;
}

.form-input:focus {
  border-color: var(--color-primary);
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-select {
  cursor: pointer;
  appearance: none;
}

.select-wrapper {
  position: relative;
}

/* Selector buttons */
.type-selector {
  display: flex;
  gap: 16px;
}

.type-btn {
  padding: 10px 24px;
  background-color: var(--color-background-subtle);
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: var(--font-weight-semibold);
  border: 1.5px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.type-btn.active-einnahme {
  background-color: #dcfce7;
  color: #15803d;
  border-color: #86efac;
}

.type-btn.active-ausgabe {
  background-color: #fee2e2;
  color: #b91c1c;
  border-color: #fca5a5;
}

/* Actions */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

.btn-cancel {
  padding: 10px 20px;
  background-color: var(--color-background-subtle);
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-submit {
  padding: 10px 24px;
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 15px;
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.btn-submit:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 600px) {
  .neue-buchung-container {
    padding: 24px 16px;
  }

  .form-actions {
    flex-direction: column-reverse;
    gap: 12px;
  }

  .btn-cancel,
  .btn-submit {
    width: 100%;
  }
}
</style>