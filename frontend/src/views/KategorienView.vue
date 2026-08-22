<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Kategorie } from '@/types/index'

import { useKategorienStore } from '@/stores/kategorien'


const store = useKategorienStore()
// Recherche & Liste réactive
const searchQuery = ref('')


// État pour le formulaire (Ajout/Édition)
const isModalOpen = ref(false)
const editingId = ref<number | null>(null)
const categoryNameInput = ref('')

onMounted(() => {
  store.fetchKategorien()
})
// Filtrage réactif selon le texte saisi
const gefilterteKategorien = computed(() => {
    const query = searchQuery.value
    .toLowerCase()
    .trim()
  return store.kategorien.filter((k) =>
    k.name.toLowerCase().includes(query)
  )
})

// Actions
const openAddModal = () => {
  editingId.value = null
  categoryNameInput.value = ''
  isModalOpen.value = true
}

const openEditModal = (kat: Kategorie) => {
  editingId.value = kat.id
  categoryNameInput.value = kat.name
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  categoryNameInput.value = ''
  editingId.value = null
}

const saveCategory = async () => {
  const trimmed = categoryNameInput.value.trim()
  if (!trimmed) return 

 if (editingId.value !== null) {
    await store.updateKategorie(
      editingId.value,
      { name: trimmed },
    )
  } else {
    await store.createKategorie({
      name: trimmed,
    })
  }

  closeModal()
}

const deleteCategory = async (id: number) => {
  await store.deleteKategorie(id)
}
</script>

<template>
  <div class="kategorien-container">
    <div class="kategorien-content">
      <!-- En-tête -->
      <h1 class="title">Kategorien</h1>
      <p class="subtitle">Verwalte deine Einnahmen- und Ausgabenkategorien.</p>
      <div v-if="store.loading" class="empty-state">
          Kategorien werden geladen...
      </div>
      <div
         v-else-if="store.error"
         class="empty-state"
      >
        {{ store.error }}
      </div>
      <!-- Barre d'action & Recherche -->
      <div class="toolbar">
        <div class="search-box">
          <i class="ti ti-search search-icon"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Kategorien suchen..."
          />
        </div>

        <button class="btn-primary" @click="openAddModal">
          + neue Kategorie
        </button>
      </div>

      <!-- Tableau des catégories -->
      <div class="card table-card">
        <div class="table-header">
          <div class="col-title">Kategorie</div>
          <div class="col-actions">Aktionen</div>
        </div>

        <div class="table-body">
          <div
            v-for="kat in gefilterteKategorien"
            :key="kat.id"
            class="table-row"
          >
            <div class="category-name">{{ kat.name }}</div>

            <div class="actions">
              <button
                class="action-btn"
                title="Bearbeiten"
                @click="openEditModal(kat)"
              >
                <i class="ti ti-pencil"></i>
              </button>

              <button
                class="action-btn text-danger"
                title="Löschen"
                @click="deleteCategory(kat.id)"
              >
                <i class="ti ti-trash"></i>
              </button>
            </div>
          </div>

          <!-- État vide -->
          <div v-if="gefilterteKategorien.length === 0" class="empty-state">
            Keine Kategorien gefunden.
          </div>
        </div>
      </div>
    </div>

    <!-- Modal d'ajout / d'édition -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <h3>{{ editingId ? 'Kategorie bearbeiten' : 'Neue Kategorie' }}</h3>

        <form @submit.prevent="saveCategory">
          <input
            v-model="categoryNameInput"
            type="text"
            placeholder="Kategoriename eingeben..."
            class="modal-input"
            autofocus
          />

          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="closeModal">
              Abbrechen
            </button>
            <button type="submit" class="btn-primary">
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css');

.kategorien-container {
  min-height: 100vh;
  padding: 32px;
  background-color: var(--color-background-subtle);
  font-family: var(--font-family-base);
}

.kategorien-content {
  max-width: 1100px;
  margin: 0 auto;
}

.title {
  margin: 0 0 8px 0;
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-h1);
}

.subtitle {
  margin: 0 0 32px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 20px;
}

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 12px;
  width: 320px;
}

.search-icon {
  color: #9ca3af;
  font-size: 18px;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: var(--color-text-primary);
  width: 100%;
}

.btn-primary {
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
  line-height: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Table Card */
.card {
  background-color: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background-color: #f3f4f6;
  border-bottom: 1px solid var(--color-border);
  font-size: 14px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid var(--color-border);
}

.table-row:last-child {
  border-bottom: none;
}

.category-name {
  font-size: 14px;
  color: var(--color-text-primary);
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
  color: var(--color-text-primary);
  transition: background-color 0.15s ease;
}

.action-btn:hover {
  background-color: var(--color-background-subtle);
}

.action-btn.text-danger:hover {
  color: #dc2626;
  border-color: #fecaca;
}

.empty-state {
  padding: 32px;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 14px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-card {
  background: var(--color-surface);
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.modal-card h3 {
  margin: 0 0 16px 0;
  color: var(--color-text-primary);
}

.modal-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  margin-bottom: 20px;
  box-sizing: border-box;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-secondary {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 640px) {
  .kategorien-container {
    padding: 16px;
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>