import React from "react"
import { useDrag } from "react-dnd"

interface IProps {
  id: number
  url: string
}

const ImageList: React.FC<IProps> = ({ id, url }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <img
      src={url}
      alt="tierimage"
      ref={drag}
      className={`w-24 h-24 object-cover ${
        isDragging ? "border border-red-500" : ""
      }`}
    />
  )
}

export default ImageList
