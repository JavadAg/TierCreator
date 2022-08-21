import React from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const CardSkeleton = ({ cards }: any) => {
  const placeholder = Array(cards).fill(0)
  console.log(placeholder)
  return (
    <div className="flex flex-wrap justify-start items-center w-full">
      {placeholder.map((item, i) => (
        <div className="flex flex-auto justify-center w-36 h-36 max-w-[350px] items-center m-1 flex-col p-1 border border-gray-200/50 bg-slate-100 rounded-md">
          <Skeleton circle width={"110px"} height={"110px"} />
          <Skeleton width={"100px"} count={1} />
        </div>
      ))}
    </div>
  )
}

export default CardSkeleton
