import UserCard from "../components/UserDetails/UserCard"
import UserTiers from "../components/UserDetails/UserTiers"
import UserTemplates from "../components/UserDetails/UserTemplates"

const UserPage = () => {
  return (
    <div className="flex justify-center items-center w-full flex-col space-y-2">
      <UserCard />
      <UserTiers />
      <UserTemplates />
    </div>
  )
}

export default UserPage
