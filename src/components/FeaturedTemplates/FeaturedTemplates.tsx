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
            <div className="flex justify-start items-center flex-col w-full space-y-1 max-w-[1200px] ">
              <span className="font-bold text-gray-900 ">
                Featured{" "}
                <span
                  onClick={() => navigate(`/categories/${item.slug}`)}
                  className="text-indigo-800 cursor-pointer"
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
