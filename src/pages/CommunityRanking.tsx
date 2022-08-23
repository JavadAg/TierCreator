import React from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import TierContainer from "../components/TierListItem/TierContainer/TierContainer"
import useFetchById from "../hooks/useFetch"
import useBreadcrumbs from "use-react-router-breadcrumbs"
import TierImage from "../components/TierListItem/TierImage/TierImage"

const CommunityRanking = (props: any) => {
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

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="flex flex-col space-y-2 justify-center items-center w-full">
          <div
            className="flex
            justify-center
            items-center
            flex-col
            space-y-2
            bg-indigo-200
            p-2
            rounded-xl
            w-full"
          >
            <span className="font-bold text-lg text-gray-900 text-center">
              {data?.data[0].template_name} Tier List Community Rankings
            </span>
            <p className="text-sm font-normal">
              {data?.data[0].template_name} Tier List below is created by
              community voting and is the cumulative average rankings from{" "}
              {data?.data.length} submitted tier lists. The best{" "}
              {data?.data[0].template_name}
              rankings are on the top of the list and the worst rankings are on
              the bottom.
            </p>
            <p className="text-sm font-semibold">
              In order for your ranking to be included, you need to be logged in
              and publish the list to the site (not simply downloading the tier
              list image).
            </p>
          </div>
          <div className="flex justify-center items-start w-full max-w-[1200px] flex-col">
            <TierContainer item={data?.data[0]} isDashboard={false} />
          </div>
          <button
            onClick={() => navigate(`/create/${data?.data[0].template_slug}`)}
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 py-1.5 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out"
            type="button"
          >
            <span>Create Your Own Ranking</span>
          </button>
          <div className="flex justify-center items-start flex-wrap">
            {data?.data.slice(1).map((item: any) => (
              <TierImage key={item.id} item={item} isDashboard={true} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CommunityRanking
