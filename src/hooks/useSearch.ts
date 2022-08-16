import { useQuery } from "@tanstack/react-query"
import { supabase } from "../utils/client"

const search = async (params: string) => {
  const { data, error } = await supabase
    .from("templates")
    .select()
    .textSearch("name", `${params}`)
  if (error) {
    throw new Error(error.message)
  }

  return data
}

export default function useSearch(params: string) {
  return useQuery([`templates`, params], () => search(params), {
    enabled: Boolean(params)
  })
}
