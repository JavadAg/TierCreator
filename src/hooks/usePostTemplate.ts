import { useMutation } from "@tanstack/react-query"
import { supabase } from "../utils/client"

interface Image {
  url: string
  id: number
}

const addTemplate = async (formData: any) => {
  console.log(formData)
  const uploadClient = supabase.storage.from("template-images")

  await uploadClient.upload(
    `public/${formData.slug}/cover/${formData.cover[0].name}`,
    formData.cover[0]
  )

  const coverUrl = uploadClient.getPublicUrl(
    `public/${formData.slug}/cover/${formData.cover[0].name}`
  )
  let id = 1
  let imagesUrl: Image[] = []

  for (const iterator of formData.images) {
    await uploadClient.upload(
      `public/${formData.slug}/images/${iterator.name}`,
      iterator
    )

    const coverUrl = uploadClient.getPublicUrl(
      `public/${formData.slug}/images/${iterator.name}`
    )
    imagesUrl.push({ url: coverUrl.publicURL as string, id: id++ })
  }

  const { data, error } = await supabase.from("templates").insert([
    {
      name: `${formData.name}`,
      category_name: `${formData.category_name}`,
      category_slug: `${formData.category_slug}`,
      slug: `${formData.slug}`,
      image: imagesUrl,
      description: `${formData.description}`,
      cover: `${coverUrl.publicURL}`,
      orientation: `${formData.orientation}`,
      rows: formData.rows,
      creator_id: formData.creator_id
    }
  ])

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export function usePostTemplate(formData: any) {
  return useMutation(() => addTemplate(formData))
}
