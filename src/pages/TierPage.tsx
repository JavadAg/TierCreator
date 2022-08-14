import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import TierContainer from "../components/TierContainer/TierContainer"
import useFetchById from "../hooks/useFetch"
import useUpdateEmoji from "../hooks/useUpdateEmoji"
import { supabase } from "../utils/client"

const emojiIcons = ["😃", "😍", "😂", "🙌", "💩"]

const TierPage = () => {
  const { state }: any = useLocation()

  const { data, error, isLoading, isFetched } = useFetchById(
    "tier",
    "id",
    undefined,
    `${state.id}`
  )

  const user = supabase.auth.user()

  const increment = useUpdateEmoji()

  useEffect(() => {
    if (isFetched)
      setCounter([
        { emoji_1: data?.[0].emoji_1.counter },
        { emoji_2: data?.[0].emoji_2.counter },
        { emoji_3: data?.[0].emoji_3.counter },
        { emoji_4: data?.[0].emoji_4.counter },
        { emoji_5: data?.[0].emoji_5.counter }
      ])
  }, [isFetched])

  const [counter, setCounter] = useState<any>()

  const clickedEmoji = (emoji: any) => {
    const { id } = emoji
    setCounter([
      { emoji_1: increment.data?.[0][id].counter },
      { emoji_2: increment.data?.[0].emoji_2.counter },
      { emoji_3: increment.data?.[0].emoji_3.counter },
      { emoji_4: increment.data?.[0].emoji_4.counter },
      { emoji_5: increment.data?.[0].emoji_5.counter }
    ])
  }

  console.log(increment.isSuccess)

  const handleEmoji = async (emoji: any) => {
    const params = { tierId: state.id, emoji, type: "tier", userId: user!.id }
    await increment.mutateAsync(params)
  }
  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="flex justify-center items-center flex-col w-full">
          <div>user card</div>
          <div
            className="border p-1 cursor-pointer"
            onClick={() => handleEmoji(data?.[0]?.emoji_1)}
          >
            <span className="text-3xl">{emojiIcons[0]}</span>
            <span>{counter?.[0]?.emoji_1?.length}</span>
          </div>
          <div
            className="border p-1 cursor-pointer"
            onClick={() => handleEmoji(data?.[0]?.emoji_2)}
          >
            <span className="text-3xl">{emojiIcons[1]}</span>
            <span>{counter?.[1]?.emoji_2?.length}</span>
          </div>
          <div
            className="border p-1 cursor-pointer"
            onClick={() => handleEmoji(data?.[0]?.emoji_3)}
          >
            <span className="text-3xl">{emojiIcons[2]}</span>
            <span>{counter?.[2]?.emoji_3?.length}</span>
          </div>
          <div
            className="border p-1 cursor-pointer"
            onClick={() => handleEmoji(data?.[0]?.emoji_4)}
          >
            <span className="text-3xl">{emojiIcons[3]}</span>
            <span>{counter?.[3]?.emoji_4?.length}</span>
          </div>
          <div
            className="border p-1 cursor-pointer"
            onClick={() => handleEmoji(data?.[0]?.emoji_5)}
          >
            <span className="text-3xl">{emojiIcons[4]}</span>
            <span>{counter?.[4]?.emoji_5?.length}</span>
          </div>
          <TierContainer item={data?.[0]} isDashboard={false} />
          <button>Delete</button>
        </div>
      )}
    </>
  )
}

export default TierPage
