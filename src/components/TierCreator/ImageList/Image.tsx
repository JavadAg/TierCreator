import React from "react"
import { useDrag } from "react-dnd"

interface IProps {
  id: number
  src: string
}

const Image: React.FC<IProps> = ({ src, id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  return (
    <img
      src={src}
      alt="tierimage"
      ref={drag}
      className={`w-24 h-24 object-cover ${
        isDragging ? "border border-red-500" : ""
      }`}
    />
  )
}

export default Image
