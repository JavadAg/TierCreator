import React from "react"
import logo from "../../assets/logo.svg"
import { FiSearch } from "react-icons/fi"
import userEvent from "@testing-library/user-event"
import { Link } from "react-router-dom"

const Navbar = () => {
  const user = {
    name: "Javad"
  }
  return (
    <div className="flex justify-between items-center p-2 bg-zinc-800 text-slate-200">
      <div className="flex justify-center items-center">
        <Link to="/">
          <img src={logo} alt="tiercreator-logo" className="h-10" />
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <i>
          <FiSearch />
        </i>
        <Link
          to="/create"
          className="bg-indigo-600 hover:bg-indigo-500 duration-200 px-2 py-1 rounded-md cursor-pointer"
        >
          Make a Tier
        </Link>
        <Link to="/categories" className="cursor-pointer">
          Categories
        </Link>
        <Link to="/tier-lists/new" className="cursor-pointer">
          New Tier Lists
        </Link>
        <Link to="/dashboard" className="capitalize cursor-pointer">
          {user.name}
        </Link>
      </div>
    </div>
  )
}

export default Navbar
