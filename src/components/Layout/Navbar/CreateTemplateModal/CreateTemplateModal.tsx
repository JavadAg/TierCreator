import React from "react"
import { useNavigate } from "react-router-dom"
import SearchBox from "../../../SearchBox/SearchBox"

const NavbarModal = () => {
  const navigate = useNavigate()
  return (
    <>
      <button
        className="bg-slate-500 flex border-b border-slate-400 p-1 justify-center items-center hover:bg-slate-400/50  duration-200 "
        data-bs-toggle="modal"
        data-bs-target={`#searchModal`}
      >
        Make a Template
      </button>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto "
        id={`searchModal`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 p-4 border-b border-gray-200 rounded-t-md ">
              <h5
                className="text-lg font-medium leading-normal text-gray-800 "
                id="exampleModalLabel"
              >
                Search for Template
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <SearchBox />
            <button
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => navigate("/create")}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarModal
