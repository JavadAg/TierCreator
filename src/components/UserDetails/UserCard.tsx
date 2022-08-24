import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import useFetchById from "../../hooks/useFetch"
import { IoLogOutOutline } from "react-icons/io5"
import useLogout from "../../hooks/useLogout"
import { supabase } from "../../utils/client"
import { BeatLoader } from "react-spinners"

const UserCard = () => {
  const { userId } = useParams()
  const signout = useLogout()
  const user = supabase.auth.user()
  const navigate = useNavigate()
  const { data, error, isLoading } = useFetchById(
    "id",
    false,
    "profiles",
    undefined,
    "id",
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
      {isLoading ? (
        <div className="flex justify-center items-center">
          <BeatLoader color="#c7d2fe" loading size={22} speedMultiplier={1} />
        </div>
      ) : (
        <div className="flex justify-center items-center bg-gray-50 p-1 rounded shadow-100 border border-gray-200 text-center space-x-1 px-2 w-full sm:h-24 md:h-28 lg:h-32 lg:space-x-3 xl:h-36">
          {user && (
            <button
              onClick={() => signout.mutate()}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="flex justify-center items-center text-sm space-x-1 bg-red-300 focus:bg-red-400 hover:bg-red-400 active:bg-red-500 px-2 py-1.5 rounded-md text-grey-900 border border-red-400 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out  xl:text-[.9rem]"
            >
              <span>
                <IoLogOutOutline />
              </span>
              <span>Logout</span>
            </button>
          )}
          <img
            className="object-cover h-12 rounded-full sm:h-16 md:h-20 lg:h-24 xl:h-28"
            src={
              data?.data[0].user_photo ||
              "https://feliwhcrkkjbvhycuxzk.supabase.co/storage/v1/object/public/category-images/Dylan39968148.png"
            }
            alt="user_photo"
          />
          <span className="capitalize font-bold text-gray-900 sm:text-xl md:text-2xl xl:text-3xl">
            {data?.data[0].first_name}
          </span>
        </div>
      )}
    </>
  )
}

export default UserCard
