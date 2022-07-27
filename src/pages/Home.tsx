import React from "react"
import Navbar from "../components/Navbar/Navbar"
import Videos from "../components/Videos/Videos"

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-start flex-col space-y-5">
        <span className="font-bold text-4xl">
          Create a Tier List for Anything
        </span>
        <p className="text-md">
          A tier list is a ranking system that allows you to rank anything in
          tiers from the best to worst. Using a tier list allows you to group
          similar ranked items together and it’s quick and easy to create a tier
          list.
        </p>
        <Videos />
      </div>
    </>
  )
}

export default Home
