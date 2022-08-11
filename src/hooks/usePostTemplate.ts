import { useMutation } from "@tanstack/react-query"
import { supabase } from "../utils/client"

interface Image {
  url: string
  id: number
}

const addTemplate = async (formData: any) => {
  const uploadClient = supabase.storage.from("template-images")
  await uploadClient.upload(
    `public/${formData.slug}/cover/${formData.cover[0].name}.jpeg`,
    formData.cover[0]
  )
  const coverUrl = uploadClient.getPublicUrl(
    `public/${formData.slug}/cover/${formData.cover[0].name}.jpeg`
  )
  let id = 1
  let imagesUrl: Image[] = []

  for (const iterator of formData.images) {
    await uploadClient.upload(
      `public/${formData.slug}/images/${iterator.name}.jpeg`,
      iterator
    )

    const coverUrl = uploadClient.getPublicUrl(
      `public/${formData.slug}/images/${iterator.name}.jpeg`
    )
    imagesUrl.push({ url: coverUrl.publicURL as string, id: id++ })
  }

  const { data, error } = await supabase.from("templates").insert([
    {
      name: `${formData.name}`,
      category: `${formData.selectedCategory}`,
      slug: `${formData.slug}`,
      image: imagesUrl,
      description: `${formData.description}`,
      cover: `${coverUrl.publicURL}`,
      orientation: `${formData.orientation}`,
      rows: formData.rows
    }
  ])

  return data
}

export function usePostTemplate(formData: any) {
  return useMutation(() => addTemplate(formData))
}
