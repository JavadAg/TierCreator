import { SortableContext, useSortable } from "@dnd-kit/sortable"

function Container({ children, id, items }) {
  const { setNodeRef } = useSortable({ id: id })

  return (
    <SortableContext id={id} items={items}>
      <div className="flex justify-center items-center max-w-[1200p] w-full outline-2 outline outline-slate-900">
        <span className="w-24 text-center items-center flex justify-center bg-slate-500 h-24">
          {id}
        </span>
        <div
          ref={setNodeRef}
          data-container={id}
          className="flex flex-wrap justify-start items-center bg-zinc-800 w-full h-24"
        >
          {children}
        </div>
        <div className="w-10 bg-red-300">
          <button>S</button>
        </div>
        <div className="w-10 bg-red-300">
          <button>U</button>
          <button>D</button>
        </div>
      </div>
    </SortableContext>
  )
}

export default Container
