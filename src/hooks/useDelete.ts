import { useMutation } from "@tanstack/react-query"
import { supabase } from "../utils/client"

const deleteTier = async (id: string) => {
  const { data, error } = await supabase.from("tier").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}

export default function useDelete() {
  return useMutation((id: string) => deleteTier(id))
}
