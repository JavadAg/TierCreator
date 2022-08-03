import React, { useState } from "react"
import { Template } from "../../../models/tier"
import Image from "./Image"
import { useDrop } from "react-dnd"

interface Image {
  url: string
  id: number
}

const ImageList = ({ image, template }: any) => {
  const [hasDropped, setHasDropped] = useState(false)

  const [board, setBoard] = useState<Image[]>([])
  console.log(board)
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
    <div>
      {image.map((item: any) => (
        <Image src={item.url} id={item.id} />
      ))}
    </div>
  )
}

export default ImageList
