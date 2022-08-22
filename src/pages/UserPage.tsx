import { useLocation, useParams } from "react-router-dom"
import ListItems from "../components/ListItems/ListItems"
import TierContainer from "../components/TierContainer/TierContainer"
import useFetchById from "../hooks/useFetch"
import { supabase } from "../utils/client"
import { IoArrowDownCircleOutline } from "react-icons/io5"

const UserPage = () => {
  const user = supabase.auth.user()
  const { userId } = useParams()
  console.log(userId)
  const { data: tiers } = useFetchById(
    "created_at",
    false,
    "tier",
    undefined,
    "creator_id",
    userId
  )

  const { data: templates, isLoading } = useFetchById(
    "created_at",
    false,
    "templates",
    undefined,
    "creator_id",
    userId
  )
  console.log(tiers)

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex justify-center items-center w-full flex-col space-y-2">
          <div className="flex justify-center items-center bg-customgrey-100 p-1 rounded shadow-200 border border-customgrey-220 text-center space-x-1 px-2 w-full">
            <img
              className="object-cover h-15 rounded-full"
              placeholder="https://feliwhcrkkjbvhycuxzk.supabase.co/storage/v1/object/public/category-images/Dylan39968148.png"
              src={tiers?.data[0].creator_photo}
              alt="user_photo"
            />
            <span className="capitalize font-bold text-customgrey-700">
              {user?.user_metadata.full_name}
            </span>
          </div>
          <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
            <button
              className="px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-600 hover:shadow-200 focus:bg-indigo-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-700 active:shadow-lg transition duration-150 ease-in-out flex justify-center items-center space-x-2 w-60"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#tierCollapse"
              aria-expanded="false"
              aria-controls="tierCollapse"
            >
              <span>Latest Tiers </span>
              <IoArrowDownCircleOutline className="text-xl" />
            </button>
          </p>
          <div className="collapse" id="tierCollapse">
            <div className="flex justify-center items-start w-full flex-wrap">
              {tiers?.data.map((item: any) => (
                <TierContainer key={item.id} item={item} isDashboard={true} />
              ))}
            </div>
          </div>

          <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
            <button
              className="px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-600 hover:shadow-lg focus:bg-indigo-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-700 active:shadow-lg transition duration-150 ease-in-out flex justify-center items-center space-x-2 w-60"
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
              <ListItems
                isTemplate={true}
                isCreate={true}
                data={templates?.data}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserPage
