import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { Category, Template } from "../models/tier"

import { supabase } from "../utils/client"

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
    })
  })
})

export const { useGetCategoriesQuery } = tierApi
export const { useGetTemplatesQuery } = tierApi
