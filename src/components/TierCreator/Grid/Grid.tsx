import React, { ReactNode, useState } from "react"
import { useDrop } from "react-dnd"
import { Row, Template } from "../../../models/tier"

interface Image {
  url: string
  id: number
}

interface Props {
  row: Row
  template: Template
}

const Grid: React.FC<Props> = ({ row, template }) => {
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
    <div ref={drop}>
      <br />
      {hasDropped && <span>dropped</span>}

      <div>
        <div className="flex justify-start items-center w-full min-h-[80px]">
          <div className="bg-blue-200 min-w-[80px] h-full min-h-[80px] flex justify-center items-center">
            {row.label}
          </div>
          <div
            ref={drop}
            className="bg-zinc-400 w-full min-h-[80px] flex justify-center items-center"
          >
            {board.map((image: Image) => (
              <img key={image.id} src={image.url} alt="image" />
            ))}
          </div>
          <div className="w-10 flex justify-center items-center bg-green-200 min-h-[80px]">
            b
          </div>
          <div className="w-10 flex justify-center items-center bg-emerald-300 min-h-[80px]">
            <button>t</button>
            <button>B</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Grid
