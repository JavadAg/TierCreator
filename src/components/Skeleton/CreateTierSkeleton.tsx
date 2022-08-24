import React from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

interface IProps {
  cards: number
}

const CreateTierSkeleton: React.FC<IProps> = ({ cards }) => {
  const placeholder = Array(cards).fill(0)
  
  return (
    <div className="flex flex-wrap justify-start items-center w-full">
      <Skeleton circle width={"110px"} height={"110px"} />
      <Skeleton width={"100px"} count={1} />
    </div>
  )
}

export default CreateTierSkeleton
