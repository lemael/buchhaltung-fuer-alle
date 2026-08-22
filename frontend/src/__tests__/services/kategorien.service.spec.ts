// tests/services/kategorien.service.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { kategorienService } from '@/services/kategorien.service'
import { api } from '@/services/api'

vi.mock('@/services/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('kategorienService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getAll() doit retourner la liste des catégories', async () => {
    const mockData = [{ id: 1, name: 'Bürobedarf' }]
    vi.mocked(api.get).mockResolvedValueOnce(mockData)

    const result = await kategorienService.getAll()

    expect(api.get).toHaveBeenCalledWith('/kategorien/')
    expect(result).toEqual(mockData)
  })

  it('create() doit poster une nouvelle catégorie', async () => {
    const payload = { name: 'Software' }
    const responseData = { id: 2, ...payload }
    vi.mocked(api.post).mockResolvedValueOnce(responseData)

    const result = await kategorienService.create(payload)

    expect(api.post).toHaveBeenCalledWith('/kategorien/', payload)
    expect(result).toEqual(responseData)
  })

  it('update() doit envoyer les modifications par PUT', async () => {
    const id = 1
    const payload = { name: 'Büromaterial' }
    const responseData = { id, name: 'Büromaterial' }
    vi.mocked(api.put).mockResolvedValueOnce(responseData)

    const result = await kategorienService.update(id, payload)

    expect(api.put).toHaveBeenCalledWith(`/kategorien/${id}/`, payload)
    expect(result).toEqual(responseData)
  })

  it('delete() doit envoyer une requête DELETE avec l ID', async () => {
    const id = 1
    vi.mocked(api.delete).mockResolvedValueOnce(undefined)

    await kategorienService.delete(id)

    expect(api.delete).toHaveBeenCalledWith(`/kategorien/${id}/`)
  })
})