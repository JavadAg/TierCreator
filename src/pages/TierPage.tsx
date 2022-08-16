import React, { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import BreadCrumb from "../components/BreadCrumb/BreadCrumb"
import Emoji from "../components/Emoji/Emoji"
import SingleEmoji from "../components/Emoji/SingleEmoji/SingleEmoji"
import TierContainer from "../components/TierContainer/TierContainer"
import useDelete from "../hooks/useDelete"
import useFetchById from "../hooks/useFetch"
import useUpdateEmoji from "../hooks/useUpdateEmoji"
import { supabase } from "../utils/client"
import { downloadasImage } from "../utils/pageToImage"

const TierPage = () => {
  const { state }: any = useLocation()

  const { data, error, isLoading, isFetched } = useFetchById(
    "tier",
    "id",
    undefined,
    `${state.id}`
  )

  const tier = useRef(null)
  const deleteTier = useDelete()

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="flex justify-center items-center flex-col w-full">
          <BreadCrumb />
          <div>user card</div>
          <button onClick={() => downloadasImage({ id: tier })}>
            Download Image
          </button>
          <Emoji isFetched={isFetched} state={state} data={data} />
          <TierContainer tier={tier} item={data?.[0]} isDashboard={false} />
          <button onClick={() => deleteTier.mutate(state.id)}>Delete</button>
        </div>
      )}
    </>
  )
}

export default TierPage
