import { useNavigate, useParams } from "react-router-dom"
import TierContainer from "../components/TierListItem/TierContainer/TierContainer"
import useFetchById from "../hooks/useFetch"
import TierImage from "../components/TierListItem/TierImage/TierImage"
import { Tier } from "../types/tier.types"
import { BeatLoader } from "react-spinners"

const CommunityRanking = () => {
  const navigate = useNavigate()

  let { slug } = useParams()

  const { data, error, isLoading } = useFetchById(
    "emoji_2->counter",
    false,
    "tier",
    undefined,
    "template_slug",
    slug
  )

  if (error)
    return (
      <div className="text-red-500 text-sm font-bold flex justify-center">
        Error fetching
      </div>
    )

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <BeatLoader color="#c7d2fe" loading size={22} speedMultiplier={1} />
        </div>
      ) : data?.data.length == 0 ? (
        <span className="font-bold text-red-600 justify-center flex mt-10">
          No tier exist for this template
        </span>
      ) : (
        <div className="space-y-2 flex justify-center items-center flex-col text-center w-full md:space-y-4">
          <div className="flex justify-center items-center flex-col space-y-2 bg-indigo-200 p-2 rounded-xl divide-y divide-gray-400 md:px-5 md:py-4 lg:px-20 xl:space-y-4">
            <span className="font-bold text-lg text-gray-800 md:text-xl">
              {data?.data[0].template_name} Tier List Community Rankings
            </span>
            <p className="text-sm text-start text-gray-700 pt-2 md:text-[.9rem]">
              {data?.data[0].template_name} Tier List below is created by
              community voting and is the cumulative average rankings from{" "}
              {data?.data.length} submitted tier lists. The best{" "}
              {data?.data[0].template_name}
              rankings are on the top of the list and the worst rankings are on
              the bottom.
            </p>
            <p className="text-sm text-start text-gray-700 pt-2 md:text-[.9rem]">
              In order for your ranking to be included, you need to be logged in
              and publish the list to the site (not simply downloading the tier
              list image).
            </p>
          </div>
          <div className="flex justify-center items-start w-full max-w-[1200px] flex-col">
            <TierContainer item={data?.data[0]} />
          </div>
          <button
            onClick={() => navigate(`/create/${data?.data[0].template_slug}`)}
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 py-1.5 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out md:text-[.9rem]"
            type="button"
          >
            <span>Create Your Tier</span>
          </button>
          <div className="grid gap-3 xl:grid-cols-2  w-full">
            {data?.data.slice(1).map((item: Tier) => (
              <TierImage key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CommunityRanking
