import React from "react"
import { useParams } from "react-router-dom"
import TierContainer from "../components/TierContainer/TierContainer"
import useFetchById, { useFetch } from "../hooks/useFetch"

const RecentTiers = () => {
  const { slug } = useParams()
  const { data, error, isLoading } = useFetchById(
    "created_at",
    false,
    "tier",
    20,
    slug ? "category_slug" : "",
    slug ? slug : ""
  )

  return (
    <div className="space-y-2 flex justify-center items-center flex-col text-center w-full">
      <div className="flex justify-center items-center flex-col space-y-2 bg-indigo-200 p-2 rounded-xl">
        <span className="font-bold text-xl text-gray-800">
          {slug ? `Recent ${slug.toUpperCase().replace("-", " & ")}` : "New"}{" "}
          Tier Lists
        </span>
        <p className="text-sm text-gray-700">
          Check out the most recent tier lists submitted by TierMaker users. Use
          this page to discover new, interesting TierMaker templates you might
          be interested in making or to rate other user’s lists with the emoji
          reactions above it.
        </p>
      </div>
      {data?.data.length == 0 ? (
        <div>No recent tier , create one</div>
      ) : (
        <div className="flex justify-center items-center flex-wrap w-full">
          {data?.data.map((item: any) => (
            <TierContainer key={item.id} item={item} isDashboard={false} />
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentTiers
