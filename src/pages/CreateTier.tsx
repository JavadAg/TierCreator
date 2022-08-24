import { useNavigate, useParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import Emoji from "../components/Emoji/Emoji"
import { MultipleContainers } from "../components/TierCreator/MultipleContainers"
import useFetchById from "../hooks/useFetch"

const CreateTier = () => {
  const navigate = useNavigate()

  const { slug } = useParams()

  const { data, error, isLoading, isFetched } = useFetchById(
    "created_at",
    true,
    "templates",
    undefined,
    "slug",
    slug
  )

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <BeatLoader color="#c7d2fe" loading size={22} speedMultiplier={1} />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col space-y-2">
          <Emoji
            isFetched={isFetched}
            data={data?.data[0]}
            type="template_emojies"
          />
          <button
            onClick={() =>
              navigate(`/${data?.data[0].category_slug}/${data?.data[0].slug}`)
            }
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 py-1.5 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out sm:w-56 md:w-60 xl:w-64 xl:text-[.9rem]"
          >
            View Community Rank
          </button>

          <MultipleContainers data={data?.data[0]} />
        </div>
      )}
    </>
  )
}

export default CreateTier
