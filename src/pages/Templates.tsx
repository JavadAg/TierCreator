import { useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import ListItems from "../components/ListItems/ListItems"
import Paginate from "../components/Paginate/Paginate"
import TemplateSort from "../components/TemplateSort/TemplateSort"
import useFetchById from "../hooks/useFetch"
import { Template } from "../types/template.types"

const Templates = () => {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [sort, setSort] = useState("name")
  const { data, error, isLoading } = useFetchById(
    sort,
    sort === "name" ? true : false,
    "templates",
    undefined,
    "category_slug",
    slug!,
    searchParams.get("page") ? Number(searchParams.get("page")) : 0
  )

  if (error) return <div>Error fetching templates</div>

  return (
    <div className="flex flex-col space-y-2 justify-center items-center w-full">
      <div className="flex justify-center items-center flex-col space-y-2 bg-indigo-200 p-2 rounded-xl w-full">
        <span className="font-bold text-lg text-gray-900">
          {slug?.toUpperCase().replace("-", " & ")} Tier List Templates
        </span>
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => navigate(`/${slug}/recent-tiers`)}
            className="bg-indigo-500 hover:bg-indigo-700  duration-200 rounded-md text-slate-200 px-2 py-1 text-sm"
          >
            Recent {slug?.toUpperCase().replace("-", " & ")} Tier Lists
          </button>
        </div>
        <span className="text-sm text-start text-gray-700">
          A collection of {slug?.toUpperCase().replace("-", " & ")} tier list
          templates.
        </span>
      </div>

      {data?.data.length == 0 ? (
        <span>No template exist , create one</span>
      ) : (
        <>
          <TemplateSort setSort={setSort} />
          <ListItems
            isLoading={isLoading}
            data={data?.data as unknown as Template[]}
            isTemplate={true}
            isCreate={true}
          />
          <Paginate
            lastItem={data?.to as number}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            count={data?.count as number}
          />
        </>
      )}
    </div>
  )
}

export default Templates
