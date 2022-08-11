import React from "react"
import { supabase } from "../../utils/client"

const UserDetails = () => {
  const user = supabase.auth.user()

  return (
    <div>
      <span>{user?.user_metadata.full_name}</span>
    </div>
  )
}

export default UserDetails
