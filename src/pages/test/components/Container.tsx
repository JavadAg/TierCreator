import React, { forwardRef } from "react"

import styles from "./Container.module.css"

export type { Props as ContainerProps }

export interface Props {
  children: React.ReactNode
  columns?: number
  label?: string
  style?: React.CSSProperties
  handleProps?: React.HTMLAttributes<any>
  shadow?: boolean
  onClick?(): void
}

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    { children, handleProps, onClick, label, style, shadow, ...props }: Props,
    ref
  ) => {
    return (
      <div
        style={
          {
            ...style
          } as React.CSSProperties
        }
        {...props}
        ref={ref as unknown as string}
        className={`flex overflow-hidden my-4 rounded-lg p-1 min-h-[80px] bg-slate-200 justify-center items-start`}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className="flex px-2 pr-4 py-2 items-center justify-between bg-red-400 rounded-md ">
            <div className="hover:bg-red-200/30 rounded-md p-1 mr-1 duration-200">
              <button {...handleProps}>x</button>
            </div>
            {label}
          </div>
        ) : null}
        <ul className="flex justify-center items-center flex-wrap">
          {children}
        </ul>
      </div>
    )
  }
)
