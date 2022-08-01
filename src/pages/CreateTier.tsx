import React from "react"
import TierCreator from "../components/TierCreator/TierCreator"
import { useGetTemplatesQuery } from "../services/tierApi"

const CreateTier = () => {
  /* const { data, isLoading } = useGetTemplatesQuery(slug) */

  return <TierCreator />
}

export default CreateTier
