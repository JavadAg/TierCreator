import { useMutation } from "@tanstack/react-query"
import { supabase } from "../utils/client"

const addTier = async (form: any) => {
  const { data, error } = await supabase.from("tier").insert([
    {
      name: form.name,
      description: form.description,
      template_name: form.template_name,
      category_name: form.category_name,
      fieldsdetails: form.fieldsdetails,
      creator_id: form.creator_id,
      creator_name: form.creator_name,
      creator_photo: form.creator_photo
    }
  ])

  return data
}

export function usePostTier(form: any) {
  return useMutation(() => addTier(form))
}
