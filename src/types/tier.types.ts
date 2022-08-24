export interface Tier {
  id: string
  category_name: string
  category_slug: string
  creator_id: string
  creator_name: string
  creator_photo: string
  fieldsdetails: Fieldsdetails
  emoji_1: Emoji
  emoji_2: Emoji
  emoji_3: Emoji
  emoji_4: Emoji
  emoji_5: Emoji
  created_at: string
  description: string
  image: string
  image_name: string
  name: string
  template_name: string
  template_slug: string
}

export interface Emoji {
  id: string
  counter: string[]
}

export interface Fieldsdetails {
  colors: string[]
  labels: string[]
  templateImages: string[][]
  fieldsbgcolor: string
}
export interface TierInputs {
  name: string
  description: string
  template_name: string
  template_slug: string
  category_name: string
  category_slug: string
  creator_id: string
  creator_name: string
  creator_photo: string
  placeholderName: string
  image: string | undefined
  fieldsdetails: Fieldsdetails
}
