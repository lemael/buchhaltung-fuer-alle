import { api } from '@/services/api'
import type { Buchung, CreateBuchungDto } from '@/types/index'

export const buchungenService = {
  getAll(): Promise<Buchung[]> {
    return api.get<Buchung[]>('/buchungen/')
  },

  create(data: CreateBuchungDto): Promise<Buchung> {
    return api.post<Buchung>('/buchungen/', data)
  },

  delete(id: number): Promise<void> {
    return api.delete(`/buchungen/${id}/`)
  },
}