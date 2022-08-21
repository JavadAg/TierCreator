import { useQuery } from "@tanstack/react-query"
import { supabase } from "../utils/client"

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3
  const from = page ? page * limit : 0
  const to = page ? from + size - 1 : size - 1
  return { from, to }
}

const fetch = async (type: string, limit?: number, order?: string) => {
  /* const { from, to } = getPagination(page, 10) */
  const { data, error } = await supabase
    .from(`${type}`)
    .select("*")
    .limit(limit ? (limit as number) : 1000)
    .order(order ? `${order}` : "id", { ascending: order ? false : true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export function useFetch(type: string, limit?: number, order?: string) {
  return useQuery([`${type}`, type, limit, order], () =>
    fetch(type, limit, order)
  )
}

//by Id or Slug
const fetchById = async (
  order: string | number | symbol,
  ascending: boolean,
  type: string,
  limit?: number,
  filterBy?: string,
  filterValue?: string,
  page?: number
) => {
  const { from, to } = getPagination(
    page ? page : 0,
    page !== undefined ? 10 : 100
  )

  const { data, count, error } = await supabase
    .from(`${type}`)
    .select(`*`, { count: "exact" })
    .eq(`${filterBy}`, `${filterValue}`)
    .limit(limit ? (limit as number) : 1000)
    .order(order, { ascending: ascending })
    .range(from, to)

  if (error) {
    throw new Error(error.message)
  }

  return { data, count, from, to }
}

export default function useFetchById(
  order: string | number | symbol,
  ascending: boolean,
  type: string,
  limit?: number,
  filterBy?: string,
  filterValue?: string,
  page?: number
) {
  return useQuery(
    [`${type}`, order, ascending, type, limit, filterBy, filterValue, page],
    () => fetchById(order, ascending, type, limit, filterBy, filterValue, page),
    {
      enabled: true
    }
  )
}
