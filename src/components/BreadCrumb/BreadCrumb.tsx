import React from "react"
import { Link, NavLink } from "react-router-dom"
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs"

const BreadCrumb = () => {
  const routes = [{ path: "/", breadcrumb: null }]
  const breadcrumbs = useReactRouterBreadcrumbs(routes)
  
  return (
    <div>
      <React.Fragment>
        {breadcrumbs.map(({ match, breadcrumb }) => (
          <span key={match.pathname}>
            <NavLink to={match.pathname}>/{breadcrumb}</NavLink>
          </span>
        ))}
      </React.Fragment>
    </div>
  )
}

export default BreadCrumb
