import React, { ReactNode } from "react"
import BreadCrumb from "./BreadCrumb/BreadCrumb"
import Footer from "./Footer/Footer"
import Navbar from "./Navbar/Navbar"

interface IProps {
  children: ReactNode
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        <BreadCrumb />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
