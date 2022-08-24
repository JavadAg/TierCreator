export interface Row {
  label: string
}

export interface Image {
  id: number
  url: string
}

export interface Template {
  id: string
  category_name: string
  category_slug: string
  cover: string
  emoji_1: Emoji
  emoji_2: Emoji
  emoji_3: Emoji
  emoji_4: Emoji
  emoji_5: Emoji
  slug: string
  created_at: string
  creator_id: string
  description: string
  image: Image[]
  name: string
  orientation: string
  tier_amount: number
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

export interface Emoji {
  id: string
  counter: string[]
}
