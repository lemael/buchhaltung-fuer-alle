import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/services/api'
import type { Kategorie, CreateKategorieDto, UpdateKategorieDto } from '@/types/index'
import { kategorienService } from '@/services/kategorien.service'

export const useKategorienStore = defineStore(
  'kategorien',
  () => {
    const kategorien = ref<Kategorie[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchKategorien() {
      loading.value = true
      error.value = null

      try {
        kategorien.value =
          await kategorienService.getAll()
      } catch (err) {
        error.value =
          err instanceof Error
            ? err.message
            : 'Unbekannter Fehler'
      } finally {
        loading.value = false
      }
    }
    async function createKategorie(
      data: CreateKategorieDto,
    ) {
      try {
        const neueKategorie =
          await kategorienService.create(data)

        kategorien.value.push(neueKategorie)
      } catch (err) {
        error.value =
          err instanceof Error
            ? err.message
            : 'Fehler beim Erstellen'
      }
    }
     async function updateKategorie(
      id: number,
      data: UpdateKategorieDto,
    ) {
      try {
        const aktualisierteKategorie =
          await kategorienService.update(id, data)

        const index = kategorien.value.findIndex(
          (kategorie) => kategorie.id === id,
        )

        if (index !== -1) {
          kategorien.value[index] =
            aktualisierteKategorie
        }
      } catch (err) {
        error.value =
          err instanceof Error
            ? err.message
            : 'Fehler beim Aktualisieren'
      }
    }
     async function deleteKategorie(id: number) {
      try {
        await kategorienService.delete(id)

        kategorien.value =
          kategorien.value.filter(
            (kategorie) => kategorie.id !== id,
          )
      } catch (err) {
        error.value =
          err instanceof Error
            ? err.message
            : 'Fehler beim Löschen'
      }
    }

    return {
      kategorien,
      loading,
      error,
      fetchKategorien,
      createKategorie,
      updateKategorie,
      deleteKategorie,
    }
  }
)