import { useDroppable } from "@dnd-kit/core"

import { SortableContext } from "@dnd-kit/sortable"

function Container({ children, id, items }) {
  const { setNodeRef } = useDroppable({ id: id })

  const align = id.split("_")[id.split("_").length - 1]

  return (
    <SortableContext id={id} items={items}>
      <div
        ref={setNodeRef}
        data-container={id}
        className="flex flex-wrap justify-center items-center bg-red-200 m-2 w-full h-24"
      >
        {children}
      </div>
    </SortableContext>
  )
}

export default Container
