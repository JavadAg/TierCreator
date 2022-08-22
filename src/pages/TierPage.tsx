import React, { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import BreadCrumb from "../components/Layout/BreadCrumb/BreadCrumb"
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
    "id",
    true,
    "tier",
    undefined,
    "id",
    `${state.id}`
  )

  const tier = useRef(null)
  const deleteTier = useDelete()
  console.log(data)
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
          <Emoji isFetched={isFetched} data={data?.data[0]} type={"tier"} />
          <TierContainer tier={tier} item={data?.data[0]} isDashboard={false} />
          <button onClick={() => deleteTier.mutate(state.id)}>Delete</button>
        </div>
      )}
    </>
  )
}

export default TierPage
