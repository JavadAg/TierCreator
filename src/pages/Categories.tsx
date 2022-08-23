import ListItems from "../components/ListItems/ListItems"
import useFetchById from "../hooks/useFetch"

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

  if (error) return <div>Error fetching categories</div>

  return (
    <div className="space-y-2 flex justify-center items-center flex-col text-center w-full">
      <div className="flex justify-center items-center flex-col space-y-2 bg-indigo-200 p-2 rounded-xl">
        <span className="font-bold text-lg text-gray-800">
          TierCreator Template Categories
        </span>
        <p className="text-sm text-start text-gray-700">
          Browse the categories on this page or use our search box to find the
          perfect tier list template for anything. If the perfect template
          doesn't yet exist, you can create your own template.
        </p>
      </div>

      <ListItems isLoading={isLoading} data={data?.data} />
    </div>
  )
}

export default Categories
