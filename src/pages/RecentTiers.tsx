import { useParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import TierImage from "../components/TierListItem/TierImage/TierImage"
import useFetchById from "../hooks/useFetch"
import { Tier } from "../types/tier.types"

const RecentTiers = () => {
  const { slug } = useParams()
  const { data, error, isLoading } = useFetchById(
    "created_at",
    false,
    "tier",
    12,
    slug ? "category_slug" : "",
    slug ? slug : ""
  )

  if (error)
    return (
      <div className="text-red-500 text-sm font-bold flex justify-center">
        Error fetching
      </div>
    )

  return (
    <div className="space-y-2 flex justify-center items-center flex-col text-center w-full md:space-y-4">
      <div className="flex justify-center items-center flex-col space-y-2 bg-indigo-200 p-2 rounded-xl divide-y divide-gray-400 md:px-5 md:py-4 lg:px-20 xl:space-y-4">
        <span className="font-bold text-lg text-gray-800 md:text-xl">
          {slug ? `Recent ${slug.toUpperCase().replace("-", " & ")}` : "New"}{" "}
          Tier Lists
        </span>
        <p className="text-sm text-start text-gray-700 pt-2 md:text-[.9rem]">
          Check out the most recent tier lists submitted by TierCreator users.
          Use this page to discover new, interesting TierCreator templates you
          might be interested in making or to rate other user’s lists with the
          emoji reactions above it.
        </p>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <BeatLoader color="#c7d2fe" loading size={22} speedMultiplier={1} />
        </div>
      ) : data?.data.length == 0 ? (
        <div>No recent tier , create one</div>
      ) : (
        <div className="grid gap-3 xl:grid-cols-2  w-full">
          {data?.data.map((item: Tier) => (
            <TierImage key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentTiers
