export interface EmojiType {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  emojis: Emoji[]
}

interface Emoji {
  id: number
  placeholder: string
  description: string
  width?: string
  createdAt: string
  updatedAt: string
  file?: File | File
}

interface File {
  id: number
  url: string
  thumbUrl: string
  filename: string
  mimeType: string
  createdAt: string
  updatedAt: string
}
