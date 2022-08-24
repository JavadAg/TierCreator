import React from "react"
import { useNavigate } from "react-router-dom"
import useFetchById from "../../hooks/useFetch"
import { Category } from "../../types/category.types"
import { Template } from "../../types/template.types"

interface IProps {
  item: Category
}

const SingleFeatured: React.FC<IProps> = ({ item }) => {
  const navigate = useNavigate()

  const { data, error, isLoading } = useFetchById(
    "tier_amount",
    false,
    "templates",
    10,
    "category_slug",
    item.slug,
    undefined
  )

  if (error)
    return (
      <div className="text-red-500 text-sm font-bold flex justify-center">
        Error fetching categories
      </div>
    )

  return (
    <div className="flex justify-start items-center border rounded h-32 border-gray-200 space-x-1 w-full overflow-y-hidden overflow-x-scroll scrollbar md:h-36 xl:h-40">
      {data?.data.map((template: Template) => (
        <div className="flex justify-start items-start flex-col h-full cursor-pointer shadow-100 hover:border hover:border-gray-200 hover:scale-105 duration-300">
          <div
            onClick={() => navigate(`/create/${template.slug}`)}
            className="flex justify-start items-start w-24 flex-col h-full overflow-hidden md:w-32 xl:w-36"
          >
            <img
              className="rounded object-cover w-full h-full"
              src={template.cover}
              alt="image"
            />
          </div>
          <span className="bg-gray-100 text-gray-900 break-all text-sm font-bold w-full border-t border-gray-300">
            {template.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default SingleFeatured
