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
      columns = 1,
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
    const Component = onClick ? "button" : "div"

    return (
      <Component
        {...props}
        ref={ref as unknown as string}
        style={
          {
            ...style,
            "--columns": columns
          } as React.CSSProperties
        }
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div>
            {label}
            <div>
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>
    )
  }
)
