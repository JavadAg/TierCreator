import React, { useEffect } from "react"
import type { DraggableSyntheticListeners } from "@dnd-kit/core"
import type { Transform } from "@dnd-kit/utilities"

export interface Props {
  dragOverlay?: boolean
  disabled?: boolean
  dragging?: boolean
  handle?: boolean
  handleProps?: any
  height?: number
  index?: number
  fadeIn?: boolean
  transform?: Transform | null
  listeners?: DraggableSyntheticListeners
  sorting?: boolean
  style?: React.CSSProperties
  transition?: string | null
  wrapperStyle?: React.CSSProperties
  value: React.ReactNode
  renderItem?(args: {
    dragOverlay: boolean
    dragging: boolean
    sorting: boolean
    fadeIn: boolean
    index: number | undefined
    listeners: DraggableSyntheticListeners
    ref: React.Ref<HTMLElement>
    style: React.CSSProperties | undefined
    transform: Props["transform"]
    transition: Props["transition"]
    value: Props["value"]
  }): React.ReactElement
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        dragOverlay,
        dragging,
        disabled,
        handle,
        handleProps,
        height,
        index,
        fadeIn,
        listeners,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value
        })
      ) : (
        <li
          className={`transform-gpu list-none flex`}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(", "),
              "--tw-translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--tw-translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--tw-scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--tw-scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": index
            } as React.CSSProperties
          }
          ref={ref}
        >
          <img
            className={`min-w-[80px] w-20 h-20 object-cover ${
              dragging && "opacity-50"
            } ${dragOverlay && "ring-[2px] ring-indigo-400 outline-none"}`}
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            alt="templateImage"
            tabIndex={!handle ? 0 : undefined}
            src={value as string}
          />
        </li>
      )
    }
  )
)
