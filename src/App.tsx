import React, { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Categories from "./pages/Categories"
import CreateTemplate from "./pages/CreateTemplate"
import CreateTier from "./pages/CreateTier"
import Home from "./pages/Home"
import Templates from "./pages/Templates"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"

const defaultAnnouncements: any = {
  onDragStart(id: any) {
    console.log(`Picked up draggable item ${id}.`)
  },
  onDragOver({ id, overId }: any) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      )
      return
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`)
  },
  onDragEnd({ id, overId }: any) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      )
      return
    }

    console.log(`Draggable item ${id} was dropped.`)
  },
  onDragCancel(id: any) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`)
  }
}

function App() {
  const [items, setItems] = useState<any>({
    root: ["1", "2", "3"],
    container1: ["4", "5", "6"],
    container2: ["7", "8", "9"],
    container3: []
  })
  const [activeId, setActiveId] = useState<any>()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Router>
        <Navbar />
        <div className="mx-52 mt-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:slug" element={<Templates />} />
            <Route path="/create" element={<CreateTemplate />} />
            <Route path="/create/:slug" element={<CreateTier />} />
          </Routes>
        </div>
      </Router>
    </DndContext>
  )

  function findContainer(id: any) {
    if (id in items) {
      return id
    }

    return Object.keys(items).find((key) => items[key].includes(id))
  }

  function handleDragStart(event: any) {
    const { active } = event
    const { id } = active

    setActiveId(id)
  }

  function handleDragOver(event: any) {
    const { active, over, draggingRect } = event
    const { id } = active
    const { id: overId } = over

    // Find the containers
    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return
    }

    setItems((prev: any) => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id)
      const overIndex = overItems.indexOf(overId)

      let newIndex
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height

        const modifier = isBelowLastItem ? 1 : 0

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item: any) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      }
    })
  }

  function handleDragEnd(event: any) {
    const { active, over } = event
    const { id } = active
    const { id: overId } = over

    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return
    }

    const activeIndex = items[activeContainer].indexOf(active.id)
    const overIndex = items[overContainer].indexOf(overId)

    if (activeIndex !== overIndex) {
      setItems((items: any) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }))
    }

    setActiveId(null)
  }
}

export default App
