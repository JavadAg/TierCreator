import React from "react"
import { useLocation } from "react-router-dom"
import TierContainer from "../components/TierContainer/TierContainer"

const TierPage = () => {
  const { state } = useLocation()
  console.log(state)
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <div>user card</div>
      <div>emojies</div>
      <TierContainer item={state} isDashboard={false} />
      <button>Delete</button>
    </div>
  )
}

export default TierPage
