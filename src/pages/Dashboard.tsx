import React from "react"
import BreadCrumb from "../components/Layout/BreadCrumb/BreadCrumb"
import UserDetails from "../components/UserCard/UserCard"
import { supabase } from "../utils/client"

const Dashboard = () => {
  return (
    <>
      <UserDetails />
    </>
  )
}

export default Dashboard
