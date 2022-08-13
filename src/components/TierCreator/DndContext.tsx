import React, { useEffect, useRef, useState } from "react"
import { createPortal, unstable_batchedUpdates } from "react-dom"
import {
  CancelDrop,
  DndContext,
  DragOverlay,
  DropAnimation,
  MouseSensor,
  TouchSensor,
  Modifiers,
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
  horizontalListSortingStrategy,
  rectSortingStrategy
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Container, ContainerProps } from "./Container"

import { Item } from "./Item"
import { useLocation } from "react-router-dom"
import { Template } from "../../models/tier"
import PageToImage from "../Page2Image/PageToImage"

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
    index,
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
      index={index}
      ref={disabled ? undefined : setNodeRef}
      color={getColor(index)}
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
  scrollable?: boolean
  vertical?: boolean
}

const PLACEHOLDER_ID = "placeholder"
const empty: Images[] = []

export function MultipleContainers({
  adjustScale = false,
  cancelDrop,
  columns,
  handle = false,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  modifiers,
  renderItem,
  vertical = true
}: Props) {
  const fieldsRef = useRef(null)

  const excludeNode = useRef(null)
  ////////////////////
  const location = useLocation()

  const template = location.state as Template

  const arrayOfImages = template.image

  let allRows = {}
  let labels = []
  for (const iterator of template.rows) {
    const label = iterator.label.trim()
    allRows = { ...allRows, [label]: [] }
    labels.push(label)
  }
  labels.push(...labels.splice(0, 1))

  const states: States = { ...allRows, default: arrayOfImages }

  const [items, setItems] = useState<States>(states)

  const [containers, setContainers] = useState<any>(labels)

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const recentlyMovedToNewContainer = useRef(false)

  const isSortingContainer = activeId ? containers.includes(activeId) : false

  const [clonedItems, setClonedItems] = useState<States | null>(null)

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id
    }

    return Object.keys(items).find((key) =>
      items[key].some((item) => item.id === id)
    )
  }

  const findItemByActiveId = (id: UniqueIdentifier) => {
    const item = Object.values(items)
      .flat()
      .find((item) => item.id == 2)
    return item!.url
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
                (item: any) => item.id !== active.id
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

        if (overId === PLACEHOLDER_ID) {
          const newContainerId = getNextContainerId()

          unstable_batchedUpdates(() => {
            setContainers((containers: string[]) => [
              ...containers,
              newContainerId
            ])
            setItems((items) => ({
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (item) => item.id !== activeId
              ),
              [newContainerId]: [active.id as any]
            }))
            setActiveId(null)
          })
          return
        }

        const overContainer = findContainer(overId)

        if (overContainer) {
          const activeIndex = items[activeContainer]
            .map((object: any) => object.id)
            .indexOf(active.id as unknown as Images)

          const overIndex = items[overContainer]
            .map((object: any) => object.id)
            .indexOf(overId as unknown as Images)

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
      <div className={`flex flex-col  w-full`}>
        <div ref={fieldsRef}>
          <SortableContext
            items={[...containers]}
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
                excludeNode={excludeNode}
                templateName={template.slug}
                label={containerId}
                columns={columns}
                items={items[containerId]}
                onRemove={() => handleRemove(containerId)}
              >
                <SortableContext
                  items={items[containerId]}
                  strategy={rectSortingStrategy}
                >
                  {items[containerId].map((value: Images, index: any) => {
                    return (
                      <SortableItem
                        disabled={isSortingContainer}
                        key={value.id}
                        id={value.id}
                        value={value.url}
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
        <DroppableContainer
          key={"default"}
          id={"default"}
          templateName={template.slug}
          label={"default"}
          columns={columns}
          items={items["default"]}
          onRemove={() => handleRemove("default")}
        >
          <SortableContext
            items={items["default"]}
            strategy={rectSortingStrategy}
          >
            {items["default"].map((value: Images, index: any) => {
              return (
                <SortableItem
                  disabled={isSortingContainer}
                  key={value.id}
                  id={value.id}
                  value={value.url}
                  index={index}
                  handle={handle}
                  style={getItemStyles}
                  wrapperStyle={wrapperStyle}
                  renderItem={renderItem}
                  containerId={"default"}
                  getIndex={getIndex}
                />
              )
            })}
          </SortableContext>
        </DroppableContainer>

        {containers.length !== 10 ? (
          <button
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block w-2/4 my-1 self-center px-6 py-2.5 bg-zinc-200 text-slate-800 font-medium text-sm leading-tight  rounded-md shadow-md hover:bg-zinc-300 hover:shadow-lg focus:bg-zinc-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-400 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleAddColumn}
          >
            Add New Field
          </button>
        ) : null}
        <PageToImage
          getFieldsDetails={getFieldsDetails}
          id={fieldsRef}
          template={template}
        />
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
        value={findItemByActiveId(id)}
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
      <Container label={containerId as string} columns={columns} shadow>
        {items[containerId].map((item: Images, index: any) => (
          <Item
            key={item.id}
            value={item.url}
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
  function handleRemove(containerID: UniqueIdentifier) {
    setContainers((containers: string[]) =>
      containers.filter((id) => id !== containerID)
    )
  }

  function handleAddColumn() {
    const newContainerId = getNextContainerId()

    unstable_batchedUpdates(() => {
      let placeholder = containers
      placeholder.splice(placeholder.length, 0, newContainerId)
      setContainers(placeholder)
      setItems((items) => ({
        ...items,
        [newContainerId]: []
      }))
    })
  }

  function getFieldsDetails() {
    let colors: any = []
    let labels: any = []
    let templateImages: any = []
    const fields: any = fieldsRef.current

    Object.values(fields.childNodes).map(
      (item: any) => (
        labels.push(item.innerText),
        colors.push(item.childNodes[0].style.backgroundColor),
        templateImages.push(
          Object.values(item.childNodes[1].childNodes)?.map(
            (child: any) => child.childNodes[0].currentSrc
          )
        )
      )
    )
    return { colors, labels, templateImages }
  }

  function getNextContainerId() {
    const containerIds = Object.keys(items)
    const lastContainerId = containerIds[containerIds.length - 1]

    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1)
  }
}

function getColor(id: UniqueIdentifier) {
  switch (String(id)[0]) {
    case "0":
      return "#FF7F7F"
    case "1":
      return "#FFBF7F"
    case "2":
      return "#FFDF7F"
    case "3":
      return "#FFFE7F"
    case "4":
      return "#BFFE7E"
  }

  return "#ccc"
}

interface SortableItemProps {
  containerId: UniqueIdentifier
  id: UniqueIdentifier
  value: UniqueIdentifier
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
  value,
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
      value={value}
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
