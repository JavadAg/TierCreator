import React, { forwardRef, useState } from "react"
import { TbDragDrop, TbTrashX, TbSettings } from "react-icons/tb"

export type { Props as ContainerProps }

export interface Props {
  children: React.ReactNode | any
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

const colorPickerOptions = [
  "#FF7F7F",
  "#FFBF7F",
  "#FFDF7F",
  "#FFFF7F",
  "#BFFF7F",
  "#7FFFFF",
  "#7FBFFF",
  "#7F7FFF",
  "#FF7FFF",
  "#BF7FBF",
  "#3B3B3B",
  "#858585",
  "#CFCFCF",
  "#F7F7F7"
]

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

    const handleColor = (
      e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>
    ) => {
      setLabelColor(e.currentTarget.value)
    }

    const handleLabelChange = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      setFieldLabel(e.target.value)
    }

    return (
      <div
        style={
          {
            ...style
          } as React.CSSProperties
        }
        {...props}
        ref={ref as unknown as string}
        className={`flex border overflow-hidden justify-center min-h-[96px] w-full max-w-[1200px]`}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {fieldLabel !== "default" && (
          <span
            style={{ backgroundColor: labelColor && labelColor }}
            className="p-1 flex justify-center items-center text-center max-w-[96px] w-full min-h-full"
          >
            {fieldLabel}
          </span>
        )}

        {placeholder ? (
          children
        ) : (
          <ul className="flex justify-start items-center flex-wrap min-h-[96px] w-full">
            {children}
          </ul>
        )}
        {label !== "default" && (
          <div
            data-html2canvas-ignore
            className="flex flex-col justify-center items-center bg-slate-300 w-12 "
          >
            <button
              className="w-full flex border-b border-slate-400 p-1 justify-center items-center hover:bg-slate-400/50 h-full duration-200"
              data-bs-toggle="modal"
              data-bs-target={`#settingsModal${index}`}
            >
              <TbSettings />
            </button>
            {onRemove ? (
              <button
                className="w-full flex border-b border-slate-400 p-1 justify-center items-center hover:bg-slate-400/50 h-full duration-200"
                onClick={onRemove}
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Delete"
              >
                <TbTrashX />
              </button>
            ) : undefined}
            <button
              className="w-full flex p-1 justify-center items-center hover:bg-slate-400/50 h-full duration-200 hover:cursor-grab "
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Grab"
              {...handleProps}
            >
              <TbDragDrop />
            </button>
            <div
              className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto "
              id={`settingsModal${index}`}
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                  <div className="modal-header flex flex-shrink-0 p-4 border-b border-gray-200 rounded-t-md ">
                    <h5
                      className="text-lg font-medium leading-normal text-gray-800 "
                      id="exampleModalLabel"
                    >
                      {fieldLabel}
                    </h5>
                    <button
                      type="button"
                      className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body relative p-4 flex flex-col justify-center items-center flex-wrap">
                    <span>Choose a Label Background Color:</span>
                    <div className="flex justify-center items-center flex-wrap">
                      {colorPickerOptions.map((item, index) => (
                        <button
                          key={index}
                          value={item}
                          onClick={handleColor}
                          style={{ backgroundColor: item }}
                          className={`m-2 py-4 px-4  rounded-full`}
                        ></button>
                      ))}
                    </div>
                    <span className="mt-4">Edit Label Text:</span>
                    <input
                      onChange={handleLabelChange}
                      type="text"
                      className="border-2 w-9/12 border-slate-200 rounded-lg px-2 py-1"
                      placeholder={fieldLabel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)
