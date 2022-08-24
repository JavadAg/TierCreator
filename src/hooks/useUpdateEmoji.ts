import { useMutation } from "@tanstack/react-query"
import { Emoji } from "../types/tier.types"
import { supabase } from "../utils/client"

interface IProps {
  type: string
  emoji: Emoji
  tierId: string
  userId: string
}

const increment = async (params: IProps) => {
  const { type, emoji, tierId, userId } = params

  const { data: emojiData, error: fetchError } = await supabase
    .from(`${type}`)
    .select(`${emoji.id}`)
    .eq("id", `${tierId}`)

  if (fetchError) {
    throw new Error(fetchError.message)
  }

  let fetchedData = emojiData![0][emoji.id]

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
  return useMutation((params: IProps) => increment(params))
}
