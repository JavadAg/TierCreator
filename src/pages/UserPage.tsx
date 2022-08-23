import { useParams } from "react-router-dom"
import useFetchById from "../hooks/useFetch"
import UserCard from "../components/UserDetails/UserCard"
import UserTiers from "../components/UserDetails/UserTiers"
import UserTemplates from "../components/UserDetails/UserTemplates"

const UserPage = () => {
  const { userId } = useParams()

  const { data, error, isLoading } = useFetchById(
    "created_at",
    false,
    "tier",
    undefined,
    "creator_id",
    userId,
    undefined,
    true
  )

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex justify-center items-center w-full flex-col space-y-2">
          <UserCard data={data?.data[0]} />
          <UserTiers data={data?.data} />
          <UserTemplates data={data?.extraData} />
        </div>
      )}
    </>
  )
}

export default UserPage
