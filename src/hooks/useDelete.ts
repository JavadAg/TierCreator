import { useMutation } from "@tanstack/react-query"
import { supabase } from "../utils/client"

const deleteTier = async (data: any) => {
  const {
    data: tier,
    error,
    status
  } = await supabase.from("tier").delete().eq("id", data.id)

  if (error) {
    throw new Error(error.message)
  }

  if (status === 200) {
    const { error } = await supabase.rpc("decrement_template", {
      template_slug: data.template_slug
    })
    await supabase.storage
      .from("tier-images")
      .remove([`public/${data.image_name}.jpeg`])

    if (error) {
      throw new Error(error.message)
    }
  }
}

export default function useDelete() {
  return useMutation((data: any) => deleteTier(data))
}
