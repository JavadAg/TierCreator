import { useEffect, useRef } from "react"
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
import { BeatLoader } from "react-spinners"
import ImageWithFallback from "../components/ImageWithFallback/ImageWithFallback"

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
  useEffect(() => window.scrollTo(0, 0), [])

  const tier = useRef<HTMLDivElement>(null)

  const deleteTier = useDelete()

  const handledelete = () => {
    deleteTier.mutate(data?.data[0], {
      onSuccess: () => navigate(`/user/${user?.id}`)
    })
  }

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
        <div className="flex justify-center items-center flex-col space-y-2 w-full">
          <div
            onClick={() => navigate(`/user/${data?.data[0].creator_id}`)}
            className="flex justify-center items-center border border-gray-200 shadow-100 rounded-md px-2 py-1 space-x-1"
          >
            <ImageWithFallback
              fallback="https://placehold.co/400/png?text=Error"
              className="object-cover h-12 rounded-full"
              src={data?.data[0].creator_photo}
              alt="creator_photo"
            />
            <span className="text-sm text-gray-600  md:text-[.9rem]">
              Creator : {data?.data[0].creator_name}
            </span>
          </div>

          <Emoji
            isFetched={isFetched}
            data={data?.data[0]}
            type={"tier_emojies"}
          />

          <button
            disabled={deleteTier.isLoading}
            onClick={() =>
              navigate(
                `/${data?.data[0].category_slug}/${data?.data[0].template_slug}`
              )
            }
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 py-1.5 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out sm:w-56 md:w-60 xl:w-64 xl:text-[.9rem] "
          >
            <IoPeopleOutline className="text-xl" />
            <span>View Community Rank</span>
          </button>
          {data?.data[0].creator_id !== user?.id && (
            <button
              onClick={() => navigate(`/create/${data?.data[0].template_slug}`)}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 py-1.5 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out sm:w-56 md:w-60 xl:w-64 xl:text-[.9rem]"
            >
              <IoAddCircleOutline className="text-xl" />
              <span>Create this Tier list</span>
            </button>
          )}

          <TierContainer tier={tier} item={data?.data[0]} />
          {data?.data[0].creator_id == user?.id && (
            <button
              disabled={deleteTier.isLoading}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 h-8 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out sm:w-56 md:w-60 xl:w-64 xl:text-[.9rem]"
              onClick={() => downloadasImage({ id: tier })}
            >
              Download Image
            </button>
          )}
          {data?.data[0].creator_id == user?.id && (
            <>
              <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
                <button
                  disabled={deleteTier.isLoading}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="flex justify-center items-center text-sm space-x-1 bg-red-400 focus:bg-red-500 hover:bg-red-600 active:bg-red-600 w-52 h-8 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0 transition duration-150 ease-in-out sm:w-56 md:w-60 xl:w-64 xl:text-[.9rem]"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#deleteCollapse"
                  aria-expanded="false"
                  aria-controls="deleteCollapse"
                >
                  <IoTrashBinOutline />
                  <span>Delete</span>
                </button>
              </p>
              <div className="collapse" id="deleteCollapse">
                <div className="p-2 w-44 rounded-lg shadow-lg bg-white flex justify-around items-center space-x-2 border border-gray-200 ">
                  <button
                    disabled={deleteTier.isLoading}
                    className="cursor-pointer text-gray-800 hover:text-red-500 active:text-red-500 disabled:text-red-200 disabled:cursor-not-allowed"
                    onClick={() => handledelete()}
                  >
                    Yes
                  </button>
                  <button
                    disabled={deleteTier.isLoading}
                    data-bs-toggle="collapse"
                    data-bs-target="#deleteCollapse"
                    className="cursor-pointer text-gray-800 hover:text-blue-500 active:text-blue-500 disabled:text-blue-200 disabled:cursor-not-allowed"
                  >
                    No
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default TierPage
