import { itemsEqual } from "@dnd-kit/sortable/dist/utilities"
import { useNavigate } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import useFetchById from "../../hooks/useFetch"
import { Category } from "../../types/category.types"
import SingleFeatured from "./SingleFeatured"

const FeaturedTemplates = () => {
  const navigate = useNavigate()

  const { data, error, isLoading } = useFetchById(
    "template_amount",
    false,
    "categories",
    5,
    "",
    "",
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
        <div className="flex justify-center items-center flex-col w-full space-y-8">
          {data?.data.map((item: Category) => (
            <div
              key={item.id}
              className="flex justify-start items-center flex-col w-full space-y-1 max-w-[1200px] "
            >
              <span className="font-bold text-gray-900 dark:text-gray-200">
                Featured{" "}
                <span
                  onClick={() => navigate(`/${item.slug}`)}
                  className="text-indigo-800 cursor-pointer dark:text-indigo-400"
                >
                  {item.name}{" "}
                </span>
                Templates
              </span>
              <SingleFeatured item={item} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default FeaturedTemplates
