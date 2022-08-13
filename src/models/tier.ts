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
  category_name: string
  category_slug: string
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
  name?: string
  slug?: string
  category_id?: number
  category_name?: string
  category_slug?: string
  description?: string
  cover?: File[]
  images?: File[]
  orientation?: string
  rows?: Row[]
  creator_id?: string
}
