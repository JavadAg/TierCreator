import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { MultipleContainers } from "../components/TierCreator/DndContext"

const CreateTier = () => {
  const navigate = useNavigate()
  const { state } = useLocation() as any

  return (
    <div className="flex justify-center items-center flex-col">
      <button
        onClick={() => navigate(`/${state.category_slug}/${state.slug}`)}
        className="bg-blue-200 p-2"
      >
        View Community Rank
      </button>

      <MultipleContainers />
    </div>
  )
}

export default CreateTier
