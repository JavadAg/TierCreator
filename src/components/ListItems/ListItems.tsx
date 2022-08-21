import React from "react"
import { Link, useNavigate } from "react-router-dom"
import CardSkeleton from "../Skeleton/CardSkeleton"
import SingleItem from "./SingleItem/SingleItem"

const ListItems = ({ isLoading, data, isCreate, isTemplate }: any) => {
  return (
    <div className="flex flex-wrap justify-start items-center w-full gap-2 ">
      {isLoading && <CardSkeleton cards={10} />}
      {data?.map((card: any) => (
        <SingleItem
          slug={card.slug}
          image={isTemplate ? card.cover : card.image}
          name={card.name}
          isCreate={isCreate}
        />
      ))}
    </div>
  )
}

export default ListItems
