import { useMutation, useQueryClient } from "@tanstack/react-query"
import userEvent from "@testing-library/user-event"
import { TbBrandWindows } from "react-icons/tb"
import UserAuth from "../components/UserAuth/UserAuth"
import { supabase } from "../utils/client"

const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: "google"
  })

  if (error) {
    throw new Error(error.message)
  }

  return user
}

export default function useAuth() {
  return useMutation(() => signInWithGoogle())
}
