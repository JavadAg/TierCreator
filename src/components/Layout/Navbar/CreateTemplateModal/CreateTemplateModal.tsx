import { useNavigate } from "react-router-dom"
import SearchBox from "../../../SearchBox/SearchBox"
import { MdOutlineClose } from "react-icons/md"

const NavbarModal = () => {
  const navigate = useNavigate()

  return (
    <>
      <button
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 px-1 py-1.5 rounded text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0 font-semibold transition duration-150 ease-in-out xl:text-[.9rem] dark:text-gray-700"
        data-bs-toggle="modal"
        data-bs-target={`#searchModal`}
      >
        Create Template
      </button>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto backdrop-blur-md dark:bg-gray-800/40"
        id={`searchModal`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding pb-2 rounded-md outline-none text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <div className="modal-header flex flex-shrink-0 p-2 border-b border-gray-200 rounded-t-md dark:border-gray-800 relative">
              <h5
                className="text-lg font-medium leading-normal text-gray-800 dark:text-gray-100"
                id="exampleModalLabel"
              >
                Search for template if already exist
              </h5>
              <button
                type="button"
                className="box-content w-4 h-4 p-1 text-gray-800 border-none rounded-none duration-200 right-2 absolute focus:shadow-none focus:outline-none focus:opacity-100 hover:opacity-75 hover:no-underline hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-200"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <MdOutlineClose />
              </button>
            </div>
            <SearchBox />

            <button
              data-bs-dismiss="modal"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 h-8 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out sm:w-56 self-center md:w-60 xl:w-64 xl:text-[.9rem] dark:text-gray-700"
              onClick={() => navigate("/create")}
            >
              Create New Template
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarModal
