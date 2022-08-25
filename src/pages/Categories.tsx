import ListItems from "../components/ListItems/ListItems"
import PageDescription from "../components/PageDescription/PageDescription"
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
      <PageDescription
        title="TierCreator Template Categories"
        description="rowse the categories on this page or use our search box to find the
        perfect tier list template for anything. If the perfect template doesn't
        yet exist, you can create your own template."
      />
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
