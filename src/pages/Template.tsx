import React from "react"
import { useLocation, useParams } from "react-router-dom"
import TierContainer from "../components/TierContainer/TierContainer"
import useFetchById from "../hooks/useFetch"
import useBreadcrumbs from "use-react-router-breadcrumbs"

const Template = (props: any) => {
  

  let { slug } = useParams()
  const { data, error, isLoading } = useFetchById(
    "tier",
    "template_slug",
    slug,
    undefined,
    "emoji_2->counter"
  )
  console.log(data)
  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <span className="text-3xl font-bold">
            {data?.[0].template_name} Tier List Community Rankings
          </span>
          <p className="text-md font-normal">
            {data?.[0].template_name} Tier List below is created by community
            voting and is the cumulative average rankings from {data?.length}
            submitted tier lists. The best {data?.[0].template_name}
            rankings are on the top of the list and the worst rankings are on
            the bottom.
          </p>
          <p className="text-md font-normal">
            In order for your ranking to be included, you need to be logged in
            and publish the list to the site (not simply downloading the tier
            list image).
          </p>
          <div className="flex justify-center items-start w-full max-w-[1200px] flex-col bg-indigo-100">
            <TierContainer item={data?.[0]} isDashboard={false} />
          </div>
          <button className="bg-green-200 p-2">Create Your Own Ranking</button>
          <div className="flex justify-center items-start flex-wrap">
            {data?.slice(1).map((item) => (
              <div className="flex justify-center items-center w-2/4 flex-col">
                <div>{item.name}</div>
                <img src={item.image} alt="" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Template
