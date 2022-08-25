import { IoArrowDownCircleOutline } from "react-icons/io5"
import { useParams } from "react-router-dom"
import useFetchById from "../../hooks/useFetch"
import { Template } from "../../types/template.types"
import ListItems from "../ListItems/ListItems"

const UserTemplates = () => {
  const { userId } = useParams()

  const { data, error, isLoading } = useFetchById(
    "created_at",
    false,
    "templates",
    undefined,
    "creator_id",
    userId,
    undefined
  )

  if (error) {
    console.log(error)
    return (
      <span className="text-red-500 font-bold flex justify-center">
        Something happened...
      </span>
    )
  }

  return (
    <>
      <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
        <button
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 py-1.5 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out sm:w-56 md:w-60 xl:w-64 xl:text-[.9rem]"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#templateCollapse"
          aria-expanded="false"
          aria-controls="templateCollapse"
        >
          <span>Latest Templates </span>
          <IoArrowDownCircleOutline className="text-xl" />
        </button>
      </p>
      <div className="collapse" id="templateCollapse">
        <div className="flex justify-center items-start w-full flex-wrap">
          {data?.data.length == 0 && (
            <span className="text-sm font-semibold text-red-600">
              No data exist
            </span>
          )}
          <ListItems
            isLoading={isLoading}
            isTemplate={true}
            isCreate={true}
            data={data?.data as Template[]}
          />
        </div>
      </div>
    </>
  )
}

export default UserTemplates
