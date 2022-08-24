import { spawn } from "child_process"
import React from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../../../utils/client"
import SearchBox from "../../../SearchBox/SearchBox"

const NavbarModal = () => {
  const user = supabase.auth.user()
  const navigate = useNavigate()
  return (
    <>
      <button
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 px-1 py-1.5 rounded text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0 font-semibold transition duration-150 ease-in-out xl:text-[.9rem]"
        data-bs-toggle="modal"
        data-bs-target={`#searchModal`}
      >
        Create Template
      </button>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto "
        id={`searchModal`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding pb-2 rounded-md outline-none text-gray-900">
            <div className="modal-header flex flex-shrink-0 p-2 border-b border-gray-200 rounded-t-md ">
              <h5
                className="text-lg font-medium leading-normal text-gray-800 "
                id="exampleModalLabel"
              >
                Search for template if already exist
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <SearchBox />
            {user ? (
              <button
                data-bs-dismiss="modal"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 h-8 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out sm:w-56 self-center md:w-60 xl:w-64 xl:text-[.9rem]"
                onClick={() => navigate("/create")}
              >
                Create New Template
              </button>
            ) : (
              <span className="text-sm md:text-[.9rem] text-red-400 font-bold text-center">
                Please Login First
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarModal
