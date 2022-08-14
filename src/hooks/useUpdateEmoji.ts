import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"

import { supabase } from "../utils/client"

const increment = async (params: any) => {
  const { type, emoji, tierId, userId } = params

  const { data: fetchData, error: fetchError } = await supabase
    .from(`${type}`)
    .select(`${emoji.id}`)
    .eq("id", `${tierId}`)

  if (fetchError) {
    throw new Error(fetchError.message)
  }

  let fetchedData = fetchData![0][emoji.id]

  const isExist = fetchedData.counter.findIndex((e: string) => e == userId)

  if (isExist == -1) {
    fetchedData.counter.push(userId)
  } else {
    fetchedData.counter = fetchedData.counter.filter(
      (id: string) => id !== userId.toString()
    )
  }

  const emojiId = emoji.id
  const { data: updatedData, error: updateError } = await supabase
    .from(`${type}`)
    .update({ [emojiId]: fetchedData })
    .eq("id", `${tierId}`)

  return updatedData
}

export default function useUpdateEmoji() {
  return useMutation((params: any) => increment(params))
}
