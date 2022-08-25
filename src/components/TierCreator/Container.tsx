import React, { forwardRef, useState } from "react"
import { TbDragDrop, TbTrashX } from "react-icons/tb"
import ContainerEditModal from "./ContainerEditModal"

export type { Props as ContainerProps }

export interface Props {
  children: React.ReactNode
  columns?: number
  label?: string
  color?: string
  templateName?: string
  hover?: boolean
  style?: React.CSSProperties
  handleProps?: React.HTMLAttributes<any>
  shadow?: boolean
  index?: number
  placeholder?: boolean
  onClick?(): void
  onRemove?(): void
}

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      onRemove,
      children,
      handleProps,
      onClick,
      placeholder,
      color,
      index,
      hover,
      templateName,
      label,
      style,
      shadow,
      ...props
    }: Props,
    ref
  ) => {
    const [fieldLabel, setFieldLabel] = useState(label)
    const [labelColor, setLabelColor] = useState(color)

    return (
      <div
        style={
          {
            ...style
          } as React.CSSProperties
        }
        {...props}
        ref={ref as unknown as string}
        className={`min-h-[96px] max-w-[1200px] ${
          fieldLabel == "default"
            ? "mt-2 border-customgrey-220 bg-customgrey-100 shadow-100 sticky bottom-0"
            : "flex justify-center w-full "
        } ${hover && "bg-gray-50/10"} `}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {fieldLabel !== "default" && (
          <span
            style={{ backgroundColor: labelColor && labelColor }}
            className="flex break-all border-r border-customgrey-240 p-1 justify-center items-center text-md text-center max-w-[96px] w-full min-h-full"
          >
            {fieldLabel}
          </span>
        )}

        {placeholder ? (
          children
        ) : (
          <ul
            className={`flex justify-start items-center min-h-[96px] ${
              fieldLabel == "default"
                ? "overflow-x-scroll scrollbar"
                : "w-full flex-wrap "
            } `}
          >
            {children}
          </ul>
        )}
        {label !== "default" && (
          <div
            data-html2canvas-ignore
            className="flex flex-col justify-center items-center bg-indigo-50  w-12 "
          >
            <ContainerEditModal
              index={index}
              fieldLabel={fieldLabel}
              setLabelColor={setLabelColor}
              setFieldLabel={setFieldLabel}
            />
            {onRemove ? (
              <button
                className="w-full flex border-b border-customgrey-220 p-1 justify-center items-center hover:bg-indigo-200/50 h-full duration-200"
                onClick={onRemove}
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Delete"
              >
                <TbTrashX />
              </button>
            ) : undefined}
            <button
              className="w-full flex p-1 justify-center items-center hover:bg-indigo-200/50 h-full duration-200 hover:cursor-grab "
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Grab"
              {...handleProps}
            >
              <TbDragDrop />
            </button>
          </div>
        )}
      </div>
    )
  }
)
