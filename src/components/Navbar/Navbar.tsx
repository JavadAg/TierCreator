import React, { useState } from "react"
import logo from "../../assets/logo.svg"
import { FiSearch } from "react-icons/fi"
import userEvent from "@testing-library/user-event"
import { Link } from "react-router-dom"
import useSearch from "../../hooks/useSearch"
import NavbarModal from "./NavbarModal/NavbarModal"
import SearchBox from "../SearchBox/SearchBox"

const Navbar = () => {
  const user = {
    name: "Javad"
  }

  return (
    <div className="flex justify-between items-center p-2 bg-zinc-800 text-slate-200 h-16 ">
      <div className="flex justify-center items-center">
        <Link to="/">
          <img src={logo} alt="tiercreator-logo" className="h-10" />
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <SearchBox />
        <NavbarModal />
        <Link to="/categories" className="cursor-pointer">
          Categories
        </Link>
        <Link to="/tier-lists/new" className="cursor-pointer">
          New Tier Lists
        </Link>
        <Link to="/login" className="capitalize cursor-pointer">
          {user.name}
        </Link>
      </div>
    </div>
  )
}

export default Navbar
