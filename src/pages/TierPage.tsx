import { useRef } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import BreadCrumb from "../components/Layout/BreadCrumb/BreadCrumb"
import Emoji from "../components/Emoji/Emoji"
import TierContainer from "../components/TierListItem/TierContainer/TierContainer"
import useDelete from "../hooks/useDelete"
import useFetchById from "../hooks/useFetch"
import { IoTrashBinOutline } from "react-icons/io5"
import { downloadasImage } from "../utils/pageToImage"
import { IoPeopleOutline, IoAddCircleOutline } from "react-icons/io5"
import { supabase } from "../utils/client"

const TierPage = () => {
  const { id } = useParams()
  const user = supabase.auth.user()
  const navigate = useNavigate()
  const { data, error, isLoading, isFetched } = useFetchById(
    "id",
    true,
    "tier",
    undefined,
    "id",
    id
  )

  const tier = useRef(null)
  const deleteTier = useDelete()

  const handledelete = () => {
    deleteTier.mutate(id as string)
  }

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="flex justify-center items-center flex-col space-y-2 w-full">
          <div
            onClick={() => navigate(`/user/${data?.data[0].creator_id}`)}
            className="flex justify-center items-center border border-customgrey-200 shadow-200 rounded-md px-2 py-1 space-x-1"
          >
            <img
              className="object-cover h-12 rounded-full"
              src={data?.data[0].creator_photo}
              alt="creator_photo"
            />
            <span className="text-sm text-customgrey-600">
              Creator : {data?.data[0].creator_name}
            </span>
          </div>

          <Emoji isFetched={isFetched} data={data?.data[0]} type={"tier"} />
          <button
            onClick={() =>
              navigate(
                `/${data?.data[0].category_slug}/${data?.data[0].template_slug}`
              )
            }
            className="bg-indigo-500 hover:bg-indigo-700  duration-200 rounded text-slate-200 w-52 px-2 py-1 text-sm justify-center flex items-center space-x-1"
          >
            <IoPeopleOutline className="text-xl" />
            <span>View Community Rank</span>
          </button>

          {data?.data[0].creator_id !== user?.id && (
            <button
              onClick={() =>
                navigate(
                  `/${data?.data[0].category_slug}/${data?.data[0].template_slug}`
                )
              }
              className="bg-indigo-500 hover:bg-indigo-700  duration-200 rounded text-slate-200 w-52 px-2 py-1 text-sm justify-center flex items-center space-x-1"
            >
              <IoAddCircleOutline className="text-xl" />
              <span>Create this Tier list</span>
            </button>
          )}

          <TierContainer tier={tier} item={data?.data[0]} />
          <button
            className="px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-600 hover:shadow-lg focus:bg-indigo-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-700 active:shadow-lg transition duration-150 ease-in-out flex justify-center items-center space-x-2 w-60 "
            onClick={() => downloadasImage({ id: tier })}
          >
            Download Image
          </button>
          <button
            className="px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-600 hover:shadow-lg focus:bg-indigo-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-700 active:shadow-lg transition duration-150 ease-in-out flex justify-center items-center space-x-2 w-60"
            onClick={() => handledelete()}
          >
            <IoTrashBinOutline />
            <span>Delete</span>
          </button>
        </div>
      )}
    </>
  )
}

export default TierPage
