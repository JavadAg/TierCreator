import { useSortable } from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

function Item({ id, isActive, label }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id })

  return (
    <span
      data-value={id}
      className={`
       flex justify-center w-24 overflow-hidden items-center bg-green-200 m-2 
       ${isActive ? " bg-blue-400" : ""} 
        `}
      // Sortable attributes:
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition
      }}
      {...attributes}
      {...listeners}
    >
      <img src={label} />
    </span>
  )
}

export default Item
