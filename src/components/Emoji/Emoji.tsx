import React from "react"
import SingleEmoji from "./SingleEmoji/SingleEmoji"

const emojiIcons = [
  { id: "emoji_1", icon: "😃" },
  { id: "emoji_2", icon: "😍" },
  { id: "emoji_3", icon: "😂" },
  { id: "emoji_4", icon: "🙌" },
  { id: "emoji_5", icon: "💩" }
]

const Emoji = ({ isFetched, state, data, type }: any) => {
  return (
    <div className="flex justify-center items-center border rounded-md divide-x divide-gray-200 border-gray-200">
      {emojiIcons.map((item) => (
        <SingleEmoji
          item={item}
          isFetched={isFetched}
          tierId={state?.id}
          data={data?.[0][item.id]}
          type={type}
        />
      ))}
    </div>
  )
}

export default Emoji
