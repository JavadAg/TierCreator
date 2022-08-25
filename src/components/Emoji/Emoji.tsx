import React from "react"
import { Tier } from "../../types/tier.types"
import SingleEmoji from "./SingleEmoji/SingleEmoji"

const emojiIcons = [
  { id: "emoji_1", icon: "😃" },
  { id: "emoji_2", icon: "😍" },
  { id: "emoji_3", icon: "😂" },
  { id: "emoji_4", icon: "🙌" },
  { id: "emoji_5", icon: "💩" }
]

interface IProps {
  isFetched: boolean
  data: Tier
  type: string
}

const Emoji: React.FC<IProps> = ({ isFetched, data, type }) => {
  return (
    <div className="flex justify-center items-center border rounded divide-x divide-customgrey-200 shadow-100 border-customgrey-200">
      {emojiIcons.map((item) => (
        <SingleEmoji
          key={item.id}
          item={item}
          tierId={data?.id}
          data={data[item.id as keyof Tier]}
          isFetched={isFetched}
          type={type}
        />
      ))}
    </div>
  )
}

export default Emoji
