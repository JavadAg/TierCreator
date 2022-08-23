import React from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs"
import { IoHomeOutline } from "react-icons/io5"

const withouSidebarRoutes = ["/home"]

const BreadCrumb = () => {
  const breadcrumbs = useReactRouterBreadcrumbs()

  const { pathname } = useLocation()

  if (withouSidebarRoutes.some((item) => pathname.includes(item))) return null

  return (
    <div className="border text-sm border-customgrey-200 bg-customgrey-100 mt-2 mx-2 px-2 py-1 rounded-md">
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <span
          className="cursor-pointer py-1 hover:text-indigo-500 active:text-indigo-500 duration-200 text-blue-600/80"
          key={match.pathname}
        >
          <NavLink to={match.pathname}>
            {">"} {breadcrumb}{" "}
          </NavLink>
        </span>
      ))}
    </div>
  )
}

export default BreadCrumb
