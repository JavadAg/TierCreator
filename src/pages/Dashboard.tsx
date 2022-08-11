import React from "react"
import UserDetails from "../components/UserDetails/UserDetails"
import { supabase } from "../utils/client"

const Dashboard = () => {
  return (
    <div>
      <UserDetails />
    </div>
  )
}

export default Dashboard
