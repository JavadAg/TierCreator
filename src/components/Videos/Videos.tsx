import React from "react"
import { Link } from "react-router-dom"
import UploadVideo from "./UploadVideo/UploadVideo"
import VideosCarousel from "./VideosCarousel/VideosCarousel"

const Videos = () => {
  return (
    <div className=" font-bold pb-4">
      TierCreator User
      <Link className="text-indigo-800 font-bold" to="/">
        {" "}
        Videos{" "}
      </Link>
      <button className="text-indigo-800 font-bold">
        <UploadVideo />
      </button>
      <VideosCarousel />
    </div>
  )
}

export default Videos
