import React, { useCallback, useEffect, useRef, useState } from "react"
import { createPortal, unstable_batchedUpdates } from "react-dom"
import {
  CancelDrop,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  Modifiers,
  useDroppable,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  defaultDropAnimationSideEffects
} from "@dnd-kit/core"
import {
  AnimateLayoutChanges,
  SortableContext,
  useSortable,
  arrayMove,
  defaultAnimateLayoutChanges,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { coordinateGetter as multipleContainersCoordinateGetter } from "./multipleContainersKeyboardCoordinates"
import { Container, ContainerProps } from "./components/Container"
import { createRange } from "./components/components/createRange"
import { Item } from "./components/Item"
import { useLocation } from "react-router-dom"
import { Template } from "../../models/tier"

export default {
  title: "Presets/Sortable/Multiple Containers"
}

interface Images {
  url: string
  id: number
}

interface States {
  [key: string]: Images[]
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true })

function DroppableContainer({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  ...props
}: ContainerProps & {
  disabled?: boolean
  id: UniqueIdentifier
  items: Images[]
  style?: React.CSSProperties
}) {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform
  } = useSortable({
    id,
    data: {
      type: "container",
      children: items
    },
    animateLayoutChanges
  })
  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== "container") ||
      items.includes(over.id as unknown as Images)
    : false

  return (
    <Container
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined
      }}
      hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners
      }}
      columns={columns}
      {...props}
    >
      {children}
    </Container>
  )
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5"
      }
    }
  })
}

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>

interface Props {
  adjustScale?: boolean
  cancelDrop?: CancelDrop
  columns?: number
  containerStyle?: React.CSSProperties
  coordinateGetter?: KeyboardCoordinateGetter
  getItemStyles?(args: {
    value: UniqueIdentifier
    index: number
    overIndex: number
    isDragging: boolean
    containerId: UniqueIdentifier
    isSorting: boolean
    isDragOverlay: boolean
  }): React.CSSProperties
  wrapperStyle?(args: { index: number }): React.CSSProperties
  itemCount?: number
  items?: Items
  handle?: boolean
  renderItem?: any
  strategy?: SortingStrategy
  modifiers?: Modifiers
  minimal?: boolean
  trashable?: boolean
  scrollable?: boolean
  vertical?: boolean
}

export const TRASH_ID = "void"
const PLACEHOLDER_ID = "placeholder"
const empty: UniqueIdentifier[] = []

export function MultipleContainers({
  adjustScale = false,
  itemCount = 3,
  cancelDrop,
  columns,
  handle = false,
  items: initialItems,
  containerStyle,
  coordinateGetter = multipleContainersCoordinateGetter,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = false,
  modifiers,
  renderItem,
  strategy = verticalListSortingStrategy,
  trashable = false,
  vertical = false,
  scrollable
}: Props) {
  ////////////////////
  const location = useLocation()

  const template = location.state as Template

  const arrayOfImages = template.image

  const images: Images[] = arrayOfImages

  let allRows = {}
  let labels = ["default"]
  for (const iterator of template.rows) {
    const label = iterator.label.trim()
    allRows = { ...allRows, [label]: [] }
    labels.push(label)
  }

  const states: States = { ...allRows, default: arrayOfImages }

  /*  const [items, setItems] = useState<Items>(
    () =>
      initialItems ?? {
        A: createRange(itemCount, (index) => `X21${index + 1}`),
        B: createRange(itemCount, (index) => `X2${index + 1}`),
        C: createRange(itemCount, (index) => `X3${index + 1}`),
        D: createRange(itemCount, (index) => `X4${index + 1}`)
      }
  )
 */

  const [items, setItems] = useState<States>(states)

  const [containers, setContainers] = useState<any>(labels)

  /*   const [containers, setContainers] = useState<any>(["A", "B", "C", "D"]) */

  ////////////////////

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)
  const isSortingContainer = activeId ? containers.includes(activeId) : false

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
  /* const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          )
        })
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args)
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args)
      let overId = getFirstCollision(intersections, "id")

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId]
          console.log(containerItems)
          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              )
            })[0]?.id
          }
        }

        lastOverId.current = overId

        return [{ id: overId }]
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeId, items]
  ) */
  const [clonedItems, setClonedItems] = useState<States | null>(null)
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter
    })
  )
  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id
    }

    return Object.keys(items).find((key) =>
      items[key].some((item) => item.id === id)
    )
  }

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id)

    if (!container) {
      return -1
    }

    const index = items[container].indexOf(id as unknown as Images)

    return index
  }

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems)
    }

    setActiveId(null)
    setClonedItems(null)
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false
    })
  }, [items])

  return (
    <DndContext
      sensors={sensors}
      /* collisionDetection={collisionDetectionStrategy} */
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id)
        setClonedItems(items)
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id

        if (overId == null || active.id in items) {
          return
        }

        const overContainer = findContainer(overId)
        const activeContainer = findContainer(active.id)

        if (!overContainer || !activeContainer) {
          return
        }

        if (activeContainer !== overContainer) {
          setItems((items: any) => {
            const activeItems = items[activeContainer]
            const overItems = items[overContainer]
            const overIndex = overItems
              .map((object: any) => object.id)
              .indexOf(overId)

            const activeIndex = activeItems
              .map((object: any) => object.id)
              .indexOf(active.id)

            console.log(overIndex)

            let newIndex: number

            if (overId in items) {
              newIndex = overItems.length + 1
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height

              const modifier = isBelowOverItem ? 1 : 0

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1
            }

            recentlyMovedToNewContainer.current = true

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (item: any) => item !== active.id
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length
                )
              ]
            }
          })
        }
      }}
      onDragEnd={({ active, over }) => {
        if (active.id in items && over?.id) {
          setContainers((containers: any) => {
            const activeIndex = containers.indexOf(active.id)
            const overIndex = containers.indexOf(over.id)

            return arrayMove(containers, activeIndex, overIndex)
          })
        }

        const activeContainer = findContainer(active.id)

        if (!activeContainer) {
          setActiveId(null)
          return
        }

        const overId = over?.id

        if (overId == null) {
          setActiveId(null)
          return
        }

        if (overId === TRASH_ID) {
          setItems((items: any) => ({
            ...items,
            [activeContainer]: items[activeContainer].filter(
              (id: any) => id !== activeId
            )
          }))
          setActiveId(null)
          return
        }

        if (overId === PLACEHOLDER_ID) {
          const newContainerId = getNextContainerId()

          unstable_batchedUpdates(() => {
            setContainers((containers: any) => [...containers, newContainerId])
            setItems((items: any) => ({
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (id: any) => id !== activeId
              ),
              [newContainerId]: [active.id]
            }))
            setActiveId(null)
          })
          return
        }

        const overContainer = findContainer(overId)

        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(
            active.id as unknown as Images
          )
          const overIndex = items[overContainer].indexOf(
            overId as unknown as Images
          )

          if (activeIndex !== overIndex) {
            setItems((items: any) => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              )
            }))
          }
        }

        setActiveId(null)
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <div
        style={{
          display: "inline-grid",
          boxSizing: "border-box",
          padding: 20,
          gridAutoFlow: vertical ? "row" : "column"
        }}
      >
        <SortableContext
          items={[...containers, PLACEHOLDER_ID]}
          strategy={
            vertical
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }
        >
          {containers.map((containerId: any) => (
            <DroppableContainer
              key={containerId}
              id={containerId}
              label={minimal ? undefined : `Column ${containerId}`}
              columns={columns}
              items={items[containerId]}
              scrollable={scrollable}
              style={containerStyle}
              unstyled={minimal}
            >
              <SortableContext items={items[containerId]} strategy={strategy}>
                {items[containerId].map((value: Images, index: any) => {
                  return (
                    <SortableItem
                      disabled={isSortingContainer}
                      key={value.id}
                      id={value.id}
                      index={index}
                      handle={handle}
                      style={getItemStyles}
                      wrapperStyle={wrapperStyle}
                      renderItem={renderItem}
                      containerId={containerId}
                      getIndex={getIndex}
                    />
                  )
                })}
              </SortableContext>
            </DroppableContainer>
          ))}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {activeId
            ? containers.includes(activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    return (
      <Item
        value={id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id) as UniqueIdentifier,
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true
        })}
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
        dragOverlay
      />
    )
  }

  function renderContainerDragOverlay(containerId: UniqueIdentifier) {
    return (
      <Container
        label={`Column ${containerId}`}
        columns={columns}
        style={{
          height: "100%"
        }}
        shadow
        unstyled={false}
      >
        {items[containerId].map((item: Images, index: any) => (
          <Item
            key={item.id}
            value={item.id}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(item.id),
              value: item.id,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false
            })}
            wrapperStyle={wrapperStyle({ index })}
            renderItem={renderItem}
          />
        ))}
      </Container>
    )
  }

  function getNextContainerId() {
    const containerIds = Object.keys(items)
    const lastContainerId = containerIds[containerIds.length - 1]

    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1)
  }
}

interface SortableItemProps {
  containerId: UniqueIdentifier
  id: UniqueIdentifier
  index: number
  handle: boolean
  disabled?: boolean
  style(args: any): React.CSSProperties
  getIndex(id: UniqueIdentifier): number
  renderItem(): React.ReactElement
  wrapperStyle({ index }: { index: number }): React.CSSProperties
}

function SortableItem({
  disabled,
  id,
  index,
  handle,
  renderItem,
  style,
  containerId,
  getIndex,
  wrapperStyle
}: SortableItemProps) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition
  } = useSortable({
    id
  })
  const mounted = useMountStatus()
  const mountedWhileDragging = isDragging && !mounted

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        value: id,
        isDragging,
        isSorting,
        overIndex: over ? getIndex(over.id) : overIndex,
        containerId
      })}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem}
    />
  )
}

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500)

    return () => clearTimeout(timeout)
  }, [])

  return isMounted
}
