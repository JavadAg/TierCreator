import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import useUpdateEmoji from "../../../hooks/useUpdateEmoji"
import { Emoji, Fieldsdetails } from "../../../types/tier.types"
import { supabase } from "../../../utils/client"

interface IProps {
  item: {
    id: string
    icon: string
  }
  data: string | Fieldsdetails | Emoji
  isFetched: boolean
  type: string
  tierId: string
}

const SingleEmoji: React.FC<IProps> = ({
  item,
  data,
  isFetched,
  type,
  tierId
}) => {
  const user = supabase.auth.user()

  const increment = useUpdateEmoji()

  useEffect(() => {
    if (isFetched) setEmoji(data as Emoji)
  }, [isFetched])

  const [emoji, setEmoji] = useState<Emoji>()

  const clickedEmoji = () => {
    if (user) {
      const isliked = emoji!.counter.some((item: string) => item === user.id)
      if (isliked) {
        setEmoji({
          ...emoji,
          counter: emoji!.counter.filter((id: string) => id !== user.id)
        } as Emoji)
      } else {
        setEmoji({ ...emoji, counter: [...emoji!.counter, user.id] } as Emoji)
      }
    }
  }

  const handleEmoji = async (emoji: Emoji) => {
    const params = { tierId, emoji, type: type, userId: user!.id }
    await increment.mutateAsync(params)
    clickedEmoji()
  }

  return (
    <div
      className="p-1 cursor-pointer active:scale-105 duration-300"
      onClick={() =>
        user ? handleEmoji(data as Emoji) : toast.error("Login First")
      }
    >
      <span className="text-3xl">{item.icon}</span>
      <span className="text-sm font-bold text-customgrey-500 hover:text-black">
        {emoji?.counter?.length}
      </span>
    </div>
  )
}

export default SingleEmoji
