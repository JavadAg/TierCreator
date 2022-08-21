import { useMutation } from "@tanstack/react-query"
import { supabase } from "../utils/client"

const signout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

export default function useLogout() {
  return useMutation(() => signout())
}
