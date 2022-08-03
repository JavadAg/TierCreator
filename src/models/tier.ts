export interface Category {
  id: string
  name: string
  image: string
  slug: string
}

export interface Row {
  label: string
}

export interface Template {
  id: string
  category: string
  cover: string
  slug: string
  created_at: string
  description: string
  image: { id: number; url: string }[]
  name: string
  orientation: string
  rows: Row[]
}

export interface Inputs {
  name: string
  slug: string
  selectedCategory: string
  description: string
  cover: File[]
  images: File[]
  orientation: string
  rows: Row[]
}
