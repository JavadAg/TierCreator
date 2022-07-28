import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react"
import { supabase } from "../../utils/client"

interface Category {
  name: string
  image: string
  slug: string
}

export const tierApi = createApi({
  reducerPath: "tierApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getCategories: build.query({
      queryFn: async () => {
        const categories = await supabase.from("categories").select("*")
        return { data: categories }
      }
    })
  })
})

export const { useGetCategoriesQuery } = tierApi
