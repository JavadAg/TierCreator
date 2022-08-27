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
    <div className="text-sm pt-2 px-2 py-1 dark:bg-gray-900">
      <div className="border text-sm border-gray-100 bg-gray-50 my-2 mx-2 px-2 py-1 rounded-md dark:bg-gray-800 dark:border-gray-800">
        {breadcrumbs.map(({ match, breadcrumb }) => (
          <span
            className="cursor-pointer py-1 hover:text-indigo-500 active:text-indigo-500 duration-200 text-blue-600/80 dark:text-blue-200 dark:hover:text-indigo-400"
            key={match.pathname}
          >
            <NavLink to={match.pathname}>
              {">"} {breadcrumb}{" "}
            </NavLink>
          </span>
        ))}
      </div>
    </div>
  )
}

export default BreadCrumb
