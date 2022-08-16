import { useMutation } from "@tanstack/react-query"
import { supabase } from "../utils/client"

const addTier = async (props: any) => {
  const form = props
  console.log(form)
  const uploadClient = supabase.storage.from("tier-images")

  const base64Response = await fetch(`${form.image}`)
  const blob = await base64Response.blob()

  await uploadClient.upload(`public/${form.placeholderName}.jpeg`, blob)

  const image = uploadClient.getPublicUrl(`public/${form.placeholderName}.jpeg`)

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
      image: `${image.publicURL}`
    }
  ])

  return props
}

export function usePostTier() {
  return useMutation((props: any) => addTier(props))
}
