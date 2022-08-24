export interface Tier {
  id: string
  category_name: string
  category_slug: string
  creator_id: string
  creator_name: string
  creator_photo: string
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
