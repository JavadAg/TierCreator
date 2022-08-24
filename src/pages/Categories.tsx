import ListItems from "../components/ListItems/ListItems"
import useFetchById from "../hooks/useFetch"
import { Category } from "../types/category.types"

const Categories = () => {
  const { data, error, isLoading } = useFetchById(
    "name",
    true,
    "categories",
    undefined,
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
    <div className="space-y-2 flex justify-center items-center flex-col text-center w-full md:space-y-4">
      <div className="flex justify-center items-center flex-col space-y-2 bg-indigo-200 p-2 rounded-xl divide-y divide-gray-400 md:px-5 md:py-4 lg:px-20 xl:space-y-4">
        <span className="font-bold text-lg text-gray-800 md:text-xl">
          TierCreator Template Categories
        </span>
        <p className="text-sm text-start text-gray-700 pt-2 md:text-[.9rem]">
          Browse the categories on this page or use our search box to find the
          perfect tier list template for anything. If the perfect template
          doesn't yet exist, you can create your own template.
        </p>
      </div>

      <ListItems
        isCreate={false}
        isTemplate={false}
        isLoading={isLoading}
        data={data?.data as Category[]}
      />
    </div>
  )
}

export default Categories
