// tests/stores/kategorien.store.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useKategorienStore } from '@/stores/kategorien'
import { kategorienService } from '@/services/kategorien.service'

vi.mock('@/services/kategorien.service')

describe('useKategorienStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetchKategorien() charge la liste et met à jour loading', async () => {
    const mockData = [{ id: 1, name: 'Reisen' }]
    vi.mocked(kategorienService.getAll).mockResolvedValueOnce(mockData)

    const store = useKategorienStore()
    expect(store.loading).toBe(false)

    const fetchPromise = store.fetchKategorien()
    expect(store.loading).toBe(true)

    await fetchPromise
    expect(store.kategorien).toEqual(mockData)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('deleteKategorie() retire un élément du store en cas de succès', async () => {
    const store = useKategorienStore()
    store.kategorien = [
      { id: 1, name: 'Reisen' },
      { id: 2, name: 'Internet' },
    ]

    vi.mocked(kategorienService.delete).mockResolvedValueOnce(undefined)

    await store.deleteKategorie(1)

    expect(kategorienService.delete).toHaveBeenCalledWith(1)
    expect(store.kategorien).toHaveLength(1)
    expect(store.kategorien[0].id).toBe(2)
  })

  it('gère les erreurs réseau correctement lors du fetch', async () => {
    vi.mocked(kategorienService.getAll).mockRejectedValueOnce(
      new Error('Erreur réseau'),
    )

    const store = useKategorienStore()
    await store.fetchKategorien()

    expect(store.error).toBe('Erreur réseau')
    expect(store.loading).toBe(false)
  })
})