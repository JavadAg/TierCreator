import { useMutation } from "@tanstack/react-query"
import { Inputs } from "../types/template.types"
import { supabase } from "../utils/client"

interface Image {
  url: string
  id: number
}

const addTemplate = async (props: Inputs) => {
  const uploadClient = supabase.storage.from("template-images")

  await uploadClient.upload(
    `public/${props.slug}/cover/${props.cover![0].name}`,
    props.cover![0]
  )

  const coverUrl = uploadClient.getPublicUrl(
    `public/${props.slug}/cover/${props.cover![0].name}`
  )
  let id = 1
  let imagesUrl: Image[] = []

  for (const iterator of props.images!) {
    await uploadClient.upload(
      `public/${props.slug}/images/${iterator.name}`,
      iterator
    )

    const coverUrl = uploadClient.getPublicUrl(
      `public/${props.slug}/images/${iterator.name}`
    )
    imagesUrl.push({ url: coverUrl.publicURL as string, id: id++ })
  }

  const { data, error, status } = await supabase.from("templates").insert([
    {
      name: `${props.name}`,
      category_name: `${props.category_name}`,
      category_slug: `${props.category_slug}`,
      slug: `${props.slug}`,
      image: imagesUrl,
      description: `${props.description}`,
      cover: `${coverUrl.publicURL}`,
      orientation: `${props.orientation}`,
      rows: props.rows,
      creator_id: props.creator_id
    }
  ])

  if (error) {
    throw new Error(error.message)
  }

  if (status === 201) {
    const { data, error } = await supabase.rpc("increment_category", {
      category_slug: props.category_slug
    })

    if (error) {
      throw new Error(error.message)
    }
  }

  return data
}

export function usePostTemplate() {
  return useMutation((props: Inputs) => addTemplate(props))
}
