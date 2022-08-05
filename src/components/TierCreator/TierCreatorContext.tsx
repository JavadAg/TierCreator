import React, { useEffect } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { useLocation } from "react-router-dom"
import { Template } from "../../models/tier"
import DraggableElement from "./DroppableLists"

interface Item {
  id: number
  url: string
}

interface States {
  [index: string]: Item[]
}

const removeFromList = (list: Item[], index: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(index, 1)
  return [removed, result]
}

const addToList = (list: Item[], index: number, element: Item) => {
  const result = Array.from(list)
  result.splice(index, 0, element)
  return result
}

const TierCreatorContext = () => {
  const location = useLocation()

  const template = location.state as Template

  let labels: string[] = ["default"]

  let allRows = {}
  for (const iterator of template.rows) {
    const label = iterator.label.trim()
    labels.push(label)
    allRows = { ...allRows, [label]: [] }
  }

  const states: States = { ...allRows, default: template.image }

  const [elements, setElements] = React.useState<States>(states)

  useEffect(() => {
    setElements(states)
  }, [])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const listCopy = { ...elements }

    const sourceList = listCopy[result.source.droppableId]
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    )

    listCopy[result.source.droppableId] = newSourceList as Item[]

    const destinationList = listCopy[result.destination.droppableId]

    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement as Item
    )

    setElements(listCopy)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center items-center  flex-col w-full bg-red-200 min-h-[220px]">
        {labels.map((listKey) => (
          <DraggableElement
            list={elements[listKey]}
            key={listKey}
            prefix={listKey}
          />
        ))}
      </div>
    </DragDropContext>
  )
}

export default TierCreatorContext
