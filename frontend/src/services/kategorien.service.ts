import { api } from '@/services/api'
import type { Kategorie, CreateKategorieDto, UpdateKategorieDto } from '@/types/index'

export const kategorienService = {
  getAll() {
    return api.get<Kategorie[]>('/kategorien/')
  },

  create(data: CreateKategorieDto) {
    return api.post<Kategorie>('/kategorien/', data)
  },
  update(
    id: number,
    data: UpdateKategorieDto,
  ): Promise<Kategorie> {
    return api.put<Kategorie>(
      `/kategorien/${id}/`,
      data,
    )
  },

  delete(id: number) {
    return api.delete(`/kategorien/${id}/`)
  },
}