import React from "react"
import { Link } from "react-router-dom"
import UploadVideo from "./UploadVideo/UploadVideo"
import VideosCarousel from "./VideosCarousel/VideosCarousel"

const Videos = () => {
  return (
    <div className="text-gray-900 font-bold pb-4 dark:text-gray-200">
      TierCreator User
      <Link className="text-indigo-800 font-bold dark:text-indigo-400" to="/">
        {" "}
        Videos{" "}
      </Link>
      <UploadVideo />
      <VideosCarousel />
    </div>
  )
}

export default Videos
