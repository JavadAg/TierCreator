import { useMutation } from "@tanstack/react-query"
import { supabase } from "../utils/client"

const addTier = async (form: any) => {
  console.log(form)
  const { data, error } = await supabase.from("tier").insert([
    {
      name: form.name,
      description: form.description,
      template_name: form.template_name,
      template_slug: form.template_slug,
      category_name: form.category_name,
      category_slug: form.category_slug,
      fieldsdetails: form.fieldsdetails,
      creator_id: form.creator_id,
      creator_name: form.creator_name,
      creator_photo: form.creator_photo,
      emoji_1: form.emoji_1,
      emoji_2: form.emoji_2,
      emoji_3: form.emoji_3,
      emoji_4: form.emoji_4,
      emoji_5: form.emoji_5
    }
  ])

  return data
}

export function usePostTier(form: any) {
  return useMutation(() => addTier(form))
}
