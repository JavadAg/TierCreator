import { Droppable } from "react-beautiful-dnd"
import ListItem from "./DraggableItems"
import React from "react"

interface Item {
  id: number
  url: string
}

interface States {
  [index: string]: Item[]
}

interface IProps {
  prefix: string
  list: Item[]
}

const DroppableLists: React.FC<IProps> = ({ prefix, list }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="text-center w-24">{prefix !== "default" && prefix}</div>
      <Droppable direction="horizontal" droppableId={`${prefix}`}>
        {(provided) => (
          <div
            className="bg-green-200 flex flex-wrap justify-start items-center w-full border border-black min-h-[96px] "
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((item: Item, index: number) => (
              <ListItem key={item.id.toString()} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="flex justify-center items-center bg-red-400 w-24">
        <button>S</button>
      </div>
      <div className="flex flex-col justify-center items-center bg-red-400 w-24">
        <button>U</button>
        <button>B</button>
      </div>
    </div>
  )
}
export default DroppableLists
