export interface Category {
  id: string
  name: string
  image: string
  slug: string
}

export interface Template {
  id: string
  category: string
  cover: string
  slug: string
  created_at: string
  description: string
  image: string[]
  name: string
  orientation: string
  rowOne: string
  rowTwo: string
  rowThree: string
  rowFour: string
  rowFive: string
  extraRowOne: string
  extraRowTwo: string
  extraRowThree: string
  extraRowFour: string
  extraRowFive: string
}

export interface Inputs {
  name: string
  slug: string
  selectedCategory: string
  description: string
  cover: File[]
  images: File[]
  orientation: string
  rowOne: string
  rowTwo: string
  rowThree: string
  rowFour: string
  rowFive: string
  extraRowOne: string
  extraRowTwo: string
  extraRowThree: string
  extraRowFour: string
  extraRowFive: string
}
