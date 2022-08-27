import logo from "../../../assets/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import NavbarModal from "./CreateTemplateModal/CreateTemplateModal"
import SearchBox from "../../SearchBox/SearchBox"
import MobileSidebar from "./MobileSidebar/MobileSidebar"
import { supabase } from "../../../utils/client"
import { BiLogInCircle } from "react-icons/bi"
import ImageWithFallback from "../../ImageWithFallback/ImageWithFallback"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { useEffect, useState } from "react"

const Navbar = () => {
  const user = supabase.auth.user()
  const [theme, setTheme] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return (
    <>
      <div className="hidden md:flex justify-between items-center p-2 bg-white text-gray-900 h-14 shadow-100 border-b border-gray-100 xl:h-16 lg:px-10 xl:px-16 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-900 ">
        <div className="flex justify-center items-center lg:space-x-4">
          <Link to="/">
            <ImageWithFallback
              fallback="https://placehold.co/400/png?text=Error"
              src={logo}
              alt="tiercreator-logo"
              className="h-10 md:h-8"
            />
          </Link>
          <SearchBox />
        </div>
        <div className="flex justify-center items-center gap-2 lg:gap-5">
          <NavbarModal />
          <Link to="/categories">
            <span className=" cursor-pointer text-sm text-gray-900 hover:text-indigo-700 duration-200 xl:text-[.9rem] dark:text-gray-100 dark:hover:text-indigo-400">
              Categories
            </span>
          </Link>
          <Link
            to="/recent-tiers"
            className=" cursor-pointer text-sm hover:text-indigo-700 duration-200 xl:text-[.9rem] dark:hover:text-indigo-400"
          >
            New Tier Lists
          </Link>
          <button onClick={() => setTheme((prev) => !prev)}>
            {theme ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </button>
          {user ? (
            <button
              onClick={() => navigate(`/user/${user.id}`)}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="flex justify-center items-center text-sm space-x-1 bg-gray-100 focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-300 px-1 py-1.5 rounded-md text-grey-900 border border-gray-300/40 capitalize leading-tight focus:outline-none focus:ring-0 transition duration-150 ease-in-out xl:text-[.9rem] dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              <ImageWithFallback
                fallback="https://placehold.co/400/png?text=Error"
                className="object-cover h-5 rounded-full mr-1 "
                src={user?.user_metadata.picture}
                alt="avatar"
              />
              {user?.user_metadata.name}
            </button>
          ) : (
            <button
              onClick={() => navigate(`/login`)}
              className="flex justify-center items-center space-x-1 bg-gray-100 text-gray-900 p-1 rounded border border-gray-300/50 hover:text-indigo-700 duration-200 text-sm focus:bg-gray-200 xl:text-[.9rem] dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              <BiLogInCircle />
              <span>SignIn</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex md:hidden justify-between items-center p-2 bg-white text-gray-900 h-14 w-full shadow-100 border-b border-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
        <MobileSidebar />
        <div className="flex justify-center items-center space-x-2">
          <button onClick={() => setTheme((prev) => !prev)}>
            {theme ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </button>
          {user ? (
            <button
              onClick={() => navigate(`/user/${user.id}`)}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="flex justify-center items-center text-sm space-x-1 bg-gray-100 focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-300 px-1 py-1.5 rounded-md text-grey-900 border border-gray-300/40 capitalize leading-tight focus:outline-none focus:ring-0 transition duration-150 ease-in-out  dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              <ImageWithFallback
                fallback="https://placehold.co/400/png?text=Error"
                className="object-cover h-5 rounded-full mr-1"
                src={user?.user_metadata.picture}
                alt="avatar"
              />
              {user?.user_metadata.name}
            </button>
          ) : (
            <button
              onClick={() => navigate(`/login`)}
              className="flex justify-center items-center text-sm space-x-1 bg-gray-100 text-gray-900 p-1 rounded border border-gray-300/50 focus:bg-gray-200 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              <BiLogInCircle />
              <span>SignIn</span>
            </button>
          )}
          <Link to="/">
            <ImageWithFallback
              fallback="https://placehold.co/400/png?text=Error"
              src={logo}
              alt="tiercreator-logo"
              className="h-7"
            />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
