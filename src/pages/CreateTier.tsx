import { useNavigate, useParams } from "react-router-dom"
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
        <div>Loading</div>
      ) : (
        <div className="flex justify-center items-center flex-col space-y-2">
          <Emoji
            isFetched={isFetched}
            state={data?.data[0]}
            data={data?.data}
            type="templates"
          />
          <button
            onClick={() =>
              navigate(`/${data?.data[0].category_slug}/${data?.data[0].slug}`)
            }
            className="bg-indigo-500 hover:bg-indigo-700  duration-200 rounded-md text-slate-200 px-2 py-1 text-sm "
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
