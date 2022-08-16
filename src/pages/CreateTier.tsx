import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Emoji from "../components/Emoji/Emoji"
import SingleEmoji from "../components/Emoji/SingleEmoji/SingleEmoji"
import { MultipleContainers } from "../components/TierCreator/DndContext"
import useFetchById from "../hooks/useFetch"

const CreateTier = () => {
  const navigate = useNavigate()

  const { slug } = useParams()

  const { data, error, isLoading, isFetched } = useFetchById(
    "templates",
    "slug",
    slug
  )
  console.log(data)
  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <Emoji
            isFetched={isFetched}
            state={data?.[0]}
            data={data}
            type="templates"
          />
          <button
            onClick={() =>
              navigate(`/${data?.[0].category_slug}/${data?.[0].slug}`)
            }
            className="bg-blue-200 p-2"
          >
            View Community Rank
          </button>

          <MultipleContainers data={data?.[0]} />
        </div>
      )}
    </>
  )
}

export default CreateTier
