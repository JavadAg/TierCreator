import { Draggable } from "react-beautiful-dnd"
import React, { useMemo } from "react"

const ListItem = ({ item, index }) => {
  const randomHeader = "12345"

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="bg-slate-100 flex justify-center items-center border border-slate-800"
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>{randomHeader}</div>
            <span>Content</span>
            <div>
              <span>{item.content}</span>
              <div>{item.id}</div>
            </div>
          </div>
        )
      }}
    </Draggable>
  )
}

export default ListItem
