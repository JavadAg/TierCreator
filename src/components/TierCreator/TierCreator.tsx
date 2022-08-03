import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { Template } from "../../models/tier"
import { useDrag, useDrop } from "react-dnd"
import ImageList from "./ImageList/ImageList"
import Grid from "./Grid/Grid"

interface LocationState {
  template: Template
}

interface Image {
  url: string
  id: number
}

const TierCreator = () => {
  const { state } = useLocation()

  const template = state as Template

  const [board, setBoard] = useState<Image[]>([])

  const addImage = (id: number) => {
    const pictureList = template.image.filter((item: Image) => id === item.id)
    setBoard((prev) => [...prev, pictureList[0]])
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item: Image) => addImage(item.id),
    collect: (monitor) => ({ isOver: !!monitor.isOver() })
  }))

  return (
    <>
      <div className="w-full max-w-[1200px] bg-red-200">
        {template.rows.map((row, index) => (
          <Grid key={index} row={row} template={template} />
        ))}
      </div>
      <div className="flex justify-center items-center ">
        <ImageList image={template.image} template={template} />
      </div>
    </>
  )
}

export default TierCreator
