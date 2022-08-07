import React, { forwardRef } from "react"

import { Handle } from "./components/Handle"

export type { Props as ContainerProps }

export interface Props {
  children: React.ReactNode
  columns?: number
  label?: string
  style?: React.CSSProperties
  horizontal?: boolean
  hover?: boolean
  handleProps?: React.HTMLAttributes<any>
  scrollable?: boolean
  shadow?: boolean
  placeholder?: boolean
  unstyled?: boolean
  onClick?(): void
}

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      columns = 2,
      handleProps,
      horizontal,
      hover,
      onClick,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref
  ) => {
    console.log(placeholder)
    return (
      <div
        {...props}
        ref={ref as unknown as string}
        className={`flex flex-col justify-center items-start overflow-hidden min-w-[350px] max-w-[1200px] rounded-md min-h-[80px] transition-colors duration-300 ease-in-out bg-zinc-100 border border-slate-300 ${
          unstyled && "overflow-visible bg-transparent border-0"
        } ${horizontal && "w-full"} ${hover && "opacity-50"} ${
          placeholder &&
          "justify-between items-center cursor-pointer  fill-black/50 border-dashed border-black/80"
        } ${scrollable && "overflow-y-auto"} ${
          shadow && "shadow-sm shadow-slate-600/50"
        }`}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
        style={
          {
            ...style,
            "--columns": columns
          } as React.CSSProperties
        }
      >
        {label ? (
          <div className="flex px-2 pr-4 py-2 items-center justify-between bg-red-400 rounded-md hover:">
            <div className="hover:bg-red-200/30 rounded-md p-1 mr-1 duration-200">
              <Handle {...handleProps} />
            </div>
            {label}
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </div>
    )
  }
)
