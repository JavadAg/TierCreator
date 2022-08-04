import { Droppable } from "react-beautiful-dnd"
import ListItem from "./ListItem"
import React from "react"

const DraggableElement = ({ prefix, elements, template }) => {
  return (
    <div className="flex justify-center items-center flex-col w-36 h-36">
      <div>{prefix}</div>
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div
            className="bg-green-200 flex justify-center items-center flex-col w-full h-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {elements.map((item, index) => (
              <ListItem key={item.id.toString()} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
export default DraggableElement
