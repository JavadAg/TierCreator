import React, { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import SingleEmoji from "../components/SingleEmoji/SingleEmoji"
import TierContainer from "../components/TierContainer/TierContainer"
import useDelete from "../hooks/useDelete"
import useFetchById from "../hooks/useFetch"
import useUpdateEmoji from "../hooks/useUpdateEmoji"
import { supabase } from "../utils/client"
import { downloadasImage } from "../utils/pageToImage"

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

  const tier = useRef(null)
  const deleteTier = useDelete()

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="flex justify-center items-center flex-col w-full">
          <div>user card</div>
          <button onClick={() => downloadasImage({ id: tier })}>
            Download Image
          </button>
          {emojiIcons.map((item) => (
            <SingleEmoji
              item={item}
              isFetched={isFetched}
              tierId={state.id}
              data={data?.[0][item.id]}
            />
          ))}
          <TierContainer tier={tier} item={data?.[0]} isDashboard={false} />
          <button onClick={() => deleteTier.mutate(state.id)}>Delete</button>
        </div>
      )}
    </>
  )
}

export default TierPage
