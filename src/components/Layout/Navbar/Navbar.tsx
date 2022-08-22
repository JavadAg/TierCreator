import logo from "../../../assets/logo.svg"
import { Link } from "react-router-dom"
import NavbarModal from "./CreateTemplateModal/CreateTemplateModal"
import SearchBox from "../../SearchBox/SearchBox"
import MobileSidebar from "./MobileSidebar/MobileSidebar"
import { supabase } from "../../../utils/client"
import { BiLogInCircle } from "react-icons/bi"

const Navbar = () => {
  const user = supabase.auth.user()

  return (
    <>
      <div className="hidden sm:flex justify-between items-center p-2 bg-gray-50 text-gray-900 h-16">
        <div className="flex justify-center items-center">
          <Link to="/">
            <img src={logo} alt="tiercreator-logo" className="h-10" />
          </Link>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <SearchBox />
          <NavbarModal />
          <Link to="/categories" className=" cursor-pointer">
            Categories
          </Link>
          <Link to="/recent-tiers" className=" cursor-pointer">
            New Tier Lists
          </Link>
          <Link to={user ? `/user/${user?.id}` : "/login"}>
            {user ? user?.user_metadata.name : "Login"}
          </Link>
        </div>
      </div>
      <div className="flex sm:hidden justify-between items-center p-2 bg-gray-50 text-gray-900 h-14 w-full shadow-sm border-b border-gray-300">
        <MobileSidebar user={user} />

        <div className="flex justify-center items-center space-x-2">
          <Link
            to={user ? `/user/${user?.id}` : "/login"}
            className="capitalize cursor-pointer text-sm"
          >
            {user ? (
              <span className="flex justify-center items-center space-x-1 bg-gray-100 p-1 px-2 text-gray-700 rounded-md focus:bg-gray-200">
                {user?.user_metadata.name}
              </span>
            ) : (
              <div className="flex justify-center items-center space-x-1 bg-gray-100 p-1 rounded-md focus:bg-gray-200">
                <BiLogInCircle />
                <span>Login</span>
              </div>
            )}
          </Link>
          <Link to="/">
            <img src={logo} alt="tiercreator-logo" className="h-7" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
