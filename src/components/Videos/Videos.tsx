import React from "react"
import { Link } from "react-router-dom"
import UploadVideo from "./UploadVideo/UploadVideo"
import VideosCarousel from "./VideosCarousel/VideosCarousel"

const Videos = () => {
  return (
    <div className="text-sm">
      TierMaker User
      <Link className="text-gray-500 font-bold" to="/">
        {" "}
        Videos
      </Link>
      <Link className="text-gray-500 font-bold" to="/">
        {" "}
        <UploadVideo />
      </Link>
      <VideosCarousel />
    </div>
  )
}

export default Videos
