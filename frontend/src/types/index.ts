interface Buchung {
  id: number
  beschreibung: string
  betrag: number
  datum: string
  kategorie: string
  typ: 'Einnahme' | 'Ausgabe'
}

interface CreateBuchungDto {
  beschreibung: string
  betrag: number
  datum: string
  kategorie: string
  typ: 'Einnahme' | 'Ausgabe'
}

interface Kategorie {
  id: number
  name: string
}

interface CreateKategorieDto {
    name: string
}
interface UpdateKategorieDto {
  name: string
}
export type { Buchung, CreateBuchungDto, Kategorie, CreateKategorieDto, UpdateKategorieDto }