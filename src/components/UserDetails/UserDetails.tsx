import React from "react"
import useFetchById from "../../hooks/useFetch"
import { supabase } from "../../utils/client"

const UserDetails = () => {
  const user = supabase.auth.user()
  const { data, error, isLoading } = useFetchById(
    "tier",
    "creator_id",
    undefined,
    user!.id
  )

  console.log(data)
  return (
    <div>
      <div>
        <span>Name : </span>
        <span>{user?.user_metadata.full_name}</span>
      </div>

      <div></div>
    </div>
  )
}

export default UserDetails
