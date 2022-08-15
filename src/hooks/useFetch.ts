import { useQuery } from "@tanstack/react-query"
import { supabase } from "../utils/client"

const fetch = async (type: string) => {
  const { data, error } = await supabase.from(`${type}`).select("*")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export function useFetch(type: string) {
  return useQuery([`${type}`], () => fetch(type))
}

//by Id or Slug
const fetchById = async (
  type: string,
  filterBy: string,
  slug?: string,
  id?: string,
  order?: string
) => {
  const { data, error } = await supabase
    .from(`${type}`)
    .select(`*`)
    .eq(`${filterBy}`, `${slug ? slug : id}`)
    .order(order ? `${order}` : "id", { ascending: order ? false : true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export default function useFetchById(
  type: string,
  filterBy: string,
  slug?: string,
  id?: string,
  order?: string
) {
  return useQuery(
    [`${type}`],
    () => fetchById(type, filterBy, slug, id, order),
    {
      enabled: true
    }
  )
}
