import React, { useEffect } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { useLocation } from "react-router-dom"
import DraggableElement from "./DraggableElement"

// fake data generator
const getItems = (count, prefix) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000)
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`
    }
  })

const removeFromList = (list, index) => {
  const result = Array.from(list)
  const [removed] = result.splice(index, 1)
  return [removed, result]
}

const addToList = (list, index, element) => {
  const result = Array.from(list)
  result.splice(index, 0, element)
  return result
}
/* const lists = template.rows.map((row) => row.label)  */

function DragList() {
  const location = useLocation()

  const template = location.state
  let labels = ["default"]
  const lists = labels

  const generateLists = () =>
    lists.reduce(
      (acc, listKey) => ({ ...acc, [listKey]: getItems(10, listKey) }),
      {}
    )

  let extraRows = {}
  for (const iterator of template.rows) {
    const label = iterator.label.trim()
    labels.push(label)
    extraRows = { ...extraRows, [label]: [] }
  }

  const states = { default: template.image, ...extraRows }

  const [elements, setElements] = React.useState(generateLists())

  console.log(labels)

  useEffect(() => {
    setElements(states)
  }, [])

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const listCopy = { ...elements }

    const sourceList = listCopy[result.source.droppableId]
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    )
    listCopy[result.source.droppableId] = newSourceList
    const destinationList = listCopy[result.destination.droppableId]
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    )

    setElements(listCopy)
  }
  return (
    <div className="flex justify-center items-center">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center items-start space-x-12 ">
          {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              template={template}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default DragList
