import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import SingleEmoji from "../components/SingleEmoji/SingleEmoji"
import TierContainer from "../components/TierContainer/TierContainer"
import useFetchById from "../hooks/useFetch"
import useUpdateEmoji from "../hooks/useUpdateEmoji"
import { supabase } from "../utils/client"

const emojiIcons = [
  { id: "emoji_1", icon: "😃" },
  { id: "emoji_2", icon: "😍" },
  { id: "emoji_3", icon: "😂" },
  { id: "emoji_4", icon: "🙌" },
  { id: "emoji_5", icon: "💩" }
]

const TierPage = () => {
  const { state }: any = useLocation()

  const { data, error, isLoading, isFetched } = useFetchById(
    "tier",
    "id",
    undefined,
    `${state.id}`
  )

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="flex justify-center items-center flex-col w-full">
          <div>user card</div>
          {emojiIcons.map((item) => (
            <SingleEmoji
              item={item}
              isFetched={isFetched}
              tierId={state.id}
              data={data?.[0][item.id]}
            />
          ))}
          <TierContainer item={data?.[0]} isDashboard={false} />
          <button>Delete</button>
        </div>
      )}
    </>
  )
}

export default TierPage
