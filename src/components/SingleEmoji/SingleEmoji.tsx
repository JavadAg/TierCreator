import React, { useEffect, useState } from "react"
import useUpdateEmoji from "../../hooks/useUpdateEmoji"
import { supabase } from "../../utils/client"

const SingleEmoji = ({ item, isFetched, tierId, data }: any) => {
  const user = supabase.auth.user()

  const increment = useUpdateEmoji()

  useEffect(() => {
    if (isFetched) setEmoji(data)
  }, [isFetched])

  const [emoji, setEmoji] = useState<any>()

  const clickedEmoji = () => {
    const isliked = emoji.counter.some((item: string) => item === user?.id)
    if (isliked) {
      setEmoji({
        ...emoji,
        counter: emoji.counter.filter((id: string) => id !== user?.id)
      })
    } else {
      setEmoji({ ...emoji, counter: [...emoji.counter, user?.id] })
    }
  }

  const handleEmoji = async (emoji: any) => {
    const params = { tierId, emoji, type: "tier", userId: user!.id }
    await increment.mutateAsync(params)
    clickedEmoji()
  }

  return (
    <div
      className="border p-1 cursor-pointer"
      onClick={() => handleEmoji(data)}
    >
      <span className="text-3xl">{item.icon}</span>
      <span>{emoji?.counter?.length}</span>
    </div>
  )
}

export default SingleEmoji
