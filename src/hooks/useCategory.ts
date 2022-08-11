import { useQuery } from "@tanstack/react-query"
import { supabase } from "../utils/client"

const fetchCategory = async () => {
  const { data, error } = await supabase.from("categories").select("*")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export default function useCategory() {
  return useQuery(["cateogry"], () => fetchCategory(), {
    enabled: true
  })
}
