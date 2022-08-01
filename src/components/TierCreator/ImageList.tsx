import React from "react"
import { useDrag } from "react-dnd"

interface IProps {
  key: number
  src: string
}

const ImageList: React.FC<IProps> = ({ key, src }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { key: key },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <img
      src={src}
      alt="tierimage"
      ref={drag}
      className="w-24 h-24 object-cover"
    />
  )
}

export default ImageList
