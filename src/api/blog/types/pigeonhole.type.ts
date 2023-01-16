export interface Pigeonhole {
  year: number
  articles: Article[]
}

interface Article {
  id: number
  title: string
  createdAt: string
}
