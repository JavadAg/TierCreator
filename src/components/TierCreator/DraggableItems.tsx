import { Draggable } from "react-beautiful-dnd"
import React, { useMemo } from "react"

interface Item {
  id: number
  url: string
}

interface States {
  [index: string]: Item[]
}

interface IProps {
  item: Item
  index: number
}

const DraggableItems: React.FC<IProps> = ({ item, index }) => {
  return (
    <Draggable  draggableId={item.id.toString()} index={index}>
      {(provided) => {
        return (
          <div
            className="flex justify-center items-center w-24 h-24"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <img
              src={item.url}
              alt="tierImage"
              className="object-cover w-full h-full"
            />
          </div>
        )
      }}
    </Draggable>
  )
}

export default DraggableItems
