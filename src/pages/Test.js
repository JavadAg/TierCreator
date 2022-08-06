import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { Template } from "../models/tier"
import Container from "./test/container"
import Item from "./test/Item"
import { useLocation } from "react-router-dom"

export default function Test() {
  const location = useLocation()

  const template = location.state

  // Dnd sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const arrayOfImages = template.image

  // All items
  const items = arrayOfImages

  let allRows = {}
  for (const iterator of template.rows) {
    const label = iterator.label.trim()
    allRows = { ...allRows, [label]: [] }
  }

  let imageIds = []
  for (const iterator of template.image) {
    imageIds.push(iterator.id)
  }

  const states = { ...allRows, default: imageIds }

  // Layout structure
  const [layout, setLayout] = useState(states)

  // Dragged item state
  const [draggedItem, setDraggedItem] = useState(null)
  console.log(draggedItem)
  return (
    <div>
      <DndContext
        sensors={sensors}
        /**
         * When drag starts:
         * Set the dragged item state
         */
        onDragStart={({ active }) => {
          const activeItem = items.find((item) => {
            return active.id === item.id
          })

          setDraggedItem(activeItem)
        }}
        /**
         * When drag ends:
         * Remove the dragged item state
         * Update the layout state
         */
        onDragEnd={({ active, over }) => {
          // Remove the dragged item state
          setDraggedItem(null)

          // Abort if over is null or undefined
          if (!over) {
            return
          }

          // Abort if item is not moved from its original position
          if (active.id === over.id) {
            return
          }

          // Update the layout state
          setLayout((prevLayout) => {
            // Get the container ID
            const overContainerId =
              over.id in layout
                ? over.id
                : over.data.current.sortable.containerId

            // Get items in current container
            let containerItems = prevLayout[overContainerId]

            // Get dragged item and targeted item indexes
            const activeIndex = containerItems.indexOf(active.id)
            const overIndex = containerItems.indexOf(over.id)

            // Set new layout
            return {
              ...prevLayout,
              [overContainerId]: arrayMove(
                containerItems,
                activeIndex,
                overIndex
              )
            }
          })
        }}
        /**
         * Use this event handler to move items to other container
         */
        onDragOver={({ active, draggingRect, over }) => {
          // Abort if over is null or undefined
          if (!over) {
            return
          }

          // Abort if item is not moved from its original position
          if (active.id === over.id) {
            return
          }

          // Get dragged item's container ID
          const activeContainerId = active.data.current.sortable.containerId

          // Get targeted container ID
          // The target might be a container (not an item)
          const overContainerId =
            over.id in layout ? over.id : over.data.current.sortable.containerId

          // Abort if the dragged item are still in the same container
          // We only process item that is being moved to other containers
          if (activeContainerId === overContainerId) {
            return
          }

          // Chekc if we are moving item to other containers
          // We only process item that is being moved to other containers
          const overIsAContainer = overContainerId === over.id
          if (!overIsAContainer) {
            return
          }

          // Update the layout state
          setLayout((prevLayout) => {
            let activeItems = prevLayout[activeContainerId]
            let overItems = prevLayout[overContainerId]

            // Remove the dragged item from the original container
            activeItems = activeItems.filter((itemId) => {
              return itemId !== active.id
            })

            // Detect where the dragged item is coming to the targeted container
            if (active.rect.current.translated.right < over.rect.right) {
              // From left, add the dragged item as the first item
              overItems = [active.id, ...overItems]
            } else {
              // From right, add the dragged item as the last item
              overItems = [...overItems, active.id]
            }

            // Set new layout
            return {
              ...prevLayout,
              [activeContainerId]: activeItems,
              [overContainerId]: overItems
            }
          })
        }}
      >
        {Object.keys(layout).map((containerId) => {
          const containerItems = layout[containerId].map((itemId) => {
            return items.find((item) => {
              return itemId === item.id
            })
          })

          return (
            <Container
              key={containerId}
              id={containerId}
              items={containerItems}
            >
              {containerItems.map((item) => {
                return (
                  <Item
                    key={item.id}
                    id={item.id}
                    label={item.url}
                    isActive={draggedItem?.id === item.id}
                  />
                )
              })}
            </Container>
          )
        })}
        <DragOverlay>
          {draggedItem && (
            <Item id={draggedItem.value} label={draggedItem.url} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
