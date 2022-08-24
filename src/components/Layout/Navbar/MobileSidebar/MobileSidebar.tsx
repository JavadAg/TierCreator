import React from "react"
import { Link, useNavigate } from "react-router-dom"
import SearchBox from "../../../SearchBox/SearchBox"
import NavbarModal from "../CreateTemplateModal/CreateTemplateModal"
import {
  BiListUl,
  BiFolderOpen,
  BiEdit,
  BiLogOutCircle,
  BiMenu
} from "react-icons/bi"
import useLogout from "../../../../hooks/useLogout"
import { supabase } from "../../../../utils/client"

const MobileSidebar = () => {
  const signout = useLogout()
  const user = supabase.auth.user()
  const navigate = useNavigate()

  const handleSignout = () => {
    signout.mutate()
  }

  return (
    <>
      <div className="flex">
        <button
          className="text-xl focus:bg-gray-200 transition duration-150 ease-in-out p-1 rounded-md bg-gray-100"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <BiMenu />
        </button>

        <div
          className="offcanvas offcanvas-start fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 left-0 border-none w-56"
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header flex items-center justify-between p-4">
            <h5
              className="offcanvas-title mb-0 leading-normal font-semibold"
              id="offcanvasExampleLabel"
            >
              Tier Creator
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body flex-grow overflow-y-auto">
            <div className="dropdown relative flex justify-center items-center flex-col">
              <SearchBox />
              <a
                className="flex items-center justify-start space-x-2 text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer w-11/12"
                data-mdb-ripple="true"
                data-mdb-ripple-color="dark"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSidenavEx3"
                aria-expanded="false"
                aria-controls="collapseSidenavEx3"
              >
                <BiEdit className="text-lg" />
                <span>Create a Template</span>
              </a>
              <ul
                className="relative accordion-collapse collapse text-center"
                id="collapseSidenavEx3"
                aria-labelledby="sidenavEx3"
                data-bs-parent="#sidenavExample"
              >
                <li>
                  <span className="text-xs text-gray-400">
                    Search if template already exist
                  </span>
                  <SearchBox />
                  {user ? (
                    <button
                      data-bs-dismiss="offcanvas"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      className="inline-block px-6 py-2.5 bg-indigo-100 text-gray-900 font-medium text-xs leading-tight uppercase rounded-md hover:bg-indigo-200 hover:shadow-lg focus:bg-indigo-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-300 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => navigate("/create")}
                    >
                      Create a New Template
                    </button>
                  ) : (
                    <span className="text-sm md:text-[.9rem] text-red-400 font-bold text-center">
                      Please Login First
                    </span>
                  )}
                </li>
              </ul>
              <div className="flex items-center justify-start space-x-2 text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer w-11/12">
                <BiFolderOpen className="text-lg" />
                <button
                  onClick={() => navigate("/categories")}
                  data-bs-dismiss="offcanvas"
                >
                  Categories
                </button>
              </div>
              <div className="flex items-center justify-start space-x-2 text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer w-11/12">
                <BiListUl className="text-lg" />
                <button
                  onClick={() => navigate("/recent-tiers")}
                  data-bs-dismiss="offcanvas"
                >
                  New Tier Lists
                </button>
              </div>
              {user ? (
                <div className="flex items-center justify-start space-x-2 text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer w-11/12">
                  <BiLogOutCircle className="text-lg" />
                  <button
                    onClick={() => handleSignout()}
                    data-bs-dismiss="offcanvas"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileSidebar
