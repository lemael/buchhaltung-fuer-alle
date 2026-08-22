// tests/views/KategorienView.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import KategorienView from '@/views/KategorienView.vue'
import { useKategorienStore } from '@/stores/kategorien'

describe('KategorienView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('charge et affiche la liste des catégories au montage', async () => {
    const wrapper = mount(KategorienView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              kategorien: {
                kategorien: [
                  { id: 1, name: 'Bürobedarf' },
                  { id: 2, name: 'Software' },
                ],
                loading: false,
                error: null,
              },
            },
          }),
        ],
      },
    })

    const store = useKategorienStore()

    // Vérifie que la méthode de récupération est appelée au montage (onMounted)
    expect(store.fetchKategorien).toHaveBeenCalledTimes(1)

    // Vérifie que les lignes du tableau affichent bien le nom des catégories
    const categoryRows = wrapper.findAll('.category-name')
    expect(categoryRows).toHaveLength(2)
    expect(categoryRows[0].text()).toBe('Bürobedarf')
    expect(categoryRows[1].text()).toBe('Software')
  })

  it('filtre les catégories lorsque l utilisateur tape dans la barre de recherche', async () => {
    const wrapper = mount(KategorienView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              kategorien: {
                kategorien: [
                  { id: 1, name: 'Bürobedarf' },
                  { id: 2, name: 'Software' },
                ],
                loading: false,
                error: null,
              },
            },
          }),
        ],
      },
    })

    const searchInput = wrapper.find('.search-box input')
    await searchInput.setValue('Soft')

    const categoryRows = wrapper.findAll('.category-name')
    expect(categoryRows).toHaveLength(1)
    expect(categoryRows[0].text()).toBe('Software')
  })
})