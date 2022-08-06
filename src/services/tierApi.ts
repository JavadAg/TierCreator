import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { Category, Template } from "../models/tier"
import { Inputs } from "../models/tier"
import { supabase } from "../utils/client"

interface Image {
  url: string
  id: number
}

export const tierApi = createApi({
  reducerPath: "tierApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      queryFn: async () => {
        const { data: categories, error } = await supabase
          .from("categories")
          .select("*")
        return { data: categories! }
      }
    }),
    getTemplates: build.query<Template[], string>({
      queryFn: async (slug) => {
        const { data: templates, error } = await supabase
          .from("templates")
          .select("*")
          .eq("category", `${slug}`)
        return { data: templates! }
      }
    }),
    addTemplate: build.mutation<string, Inputs>({
      queryFn: async (formData) => {
        console.log(formData)
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
        /* return { data }  */
        return { data: "ss" }
      }
    })
  })
})

export const { useGetCategoriesQuery } = tierApi
export const { useGetTemplatesQuery } = tierApi
export const { useAddTemplateMutation } = tierApi
