import React from "react"
import BreadCrumb from "./BreadCrumb/BreadCrumb"
import Footer from "./Footer/Footer"
import Navbar from "./Navbar/Navbar"

const Layout = ({ children }: any) => {
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
