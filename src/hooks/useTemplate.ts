import { useQuery } from "@tanstack/react-query"
import { supabase } from "../utils/client"

const fetchTemplate = async (slug: string) => {
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("category", `${slug}`)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export function useTemplate(slug: string) {
  return useQuery(["template"], () => fetchTemplate(slug), {
    enabled: true
  })
}
