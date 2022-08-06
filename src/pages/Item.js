import { useSortable } from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

function Item({ id, isActive, label }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id })

  return (
    <img
      data-value={id}
      className={`
       flex justify-center w-24 object-cover h-full items-center overflow-hidden
       ${isActive ? "bg-transparent opacity-30" : ""} 
        `}
      // Sortable attributes:
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition
      }}
      {...attributes}
      {...listeners}
      src={label}
    />
  )
}

export default Item
