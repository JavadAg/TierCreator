import React from "react"
import { useNavigate } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import useFetchById from "../../hooks/useFetch"
import { Category } from "../../types/category.types"
import { Template } from "../../types/template.types"
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback"

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
        Error fetching
      </div>
    )

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <BeatLoader color="#c7d2fe" loading size={22} speedMultiplier={1} />
        </div>
      ) : (
        <div className="flex justify-start items-center border rounded h-32 border-gray-200 space-x-2 w-full overflow-y-hidden overflow-x-scroll scrollbar md:h-36 xl:h-40 dark:border-gray-700">
          {data?.data.map((template: Template) => (
            <div
              key={template.id}
              className="flex justify-start items-start flex-col h-full cursor-pointer shadow-100 hover:border hover:border-gray-200 hover:scale-105 duration-300 dark:hover:border-gray-700 "
            >
              <div
                onClick={() => navigate(`/create/${template.slug}`)}
                className="flex justify-start items-start w-24 flex-col h-full overflow-hidden md:w-32 xl:w-36"
              >
                <ImageWithFallback
                  fallback="https://placehold.co/400/png?text=Error"
                  className="object-cover w-full h-full"
                  src={template.cover}
                  alt="image"
                />
              </div>
              <span className="bg-gray-100 text-gray-900 break-all text-sm font-bold w-full dark:bg-gray-800 dark:text-gray-200 ">
                {template.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SingleFeatured
