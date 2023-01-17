export interface LinkType {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  links: Link[]
}

interface Link {
  id: number
  title: string
  description: string
  link: string
  icon: string
  dead: boolean
  createdAt: string
  updatedAt: string
}
