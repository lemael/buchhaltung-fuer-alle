import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Buchung, CreateBuchungDto } from '@/types/index'
import { buchungenService } from '@/services/ buchungen.service'

export const useBuchungenStore = defineStore(
  'buchungen',
  () => {
    const buchungen = ref<Buchung[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchBuchungen() {
      loading.value = true
      error.value = null

      try {
        buchungen.value =
          await buchungenService.getAll()
      } catch (err) {
        error.value =
          err instanceof Error
            ? err.message
            : 'Fehler beim Laden der Buchungen'
      } finally {
        loading.value = false
      }
    }
    
    async function createBuchung(
      data: CreateBuchungDto,
    ) {
      try {
        const neueBuchung =
          await buchungenService.create(data)

        buchungen.value.push(neueBuchung)
      } catch (err) {
        error.value =
          err instanceof Error
            ? err.message
            : 'Fehler beim Erstellen'
      }
    }
    
    async function deleteBuchung(id: number) {
      try {
        await buchungenService.delete(id)

        buchungen.value =
          buchungen.value.filter(
            (buchung) => buchung.id !== id,
          )
      } catch (err) {
        error.value =
          err instanceof Error
            ? err.message
            : 'Fehler beim Löschen'
      }
    }
    return {
      buchungen,
      loading,
      error,
      fetchBuchungen,
      createBuchung,
      deleteBuchung,
    }
  }
)