import { useMutation } from "@tanstack/react-query"
import { Navigate, useNavigate } from "react-router-dom"
import { supabase } from "../utils/client"

const signout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

export default function useLogout() {
  const navigate = useNavigate()
  return useMutation(() => signout(), { onSuccess: () => navigate("/") })
}
