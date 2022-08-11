import React, { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Categories from "./pages/Categories"
import CreateTemplate from "./pages/CreateTemplate"
import Home from "./pages/Home"
import Templates from "./pages/Templates"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { MultipleContainers } from "./components/TierCreator/DndContext"
import Login from "./pages/Login"
import { supabase } from "./utils/client"
import Dashboard from "./pages/Dashboard"
import { User } from "@supabase/supabase-js"
import Tier from "./pages/Tier"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})

function App() {
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const session = supabase.auth.session()

    setUser(session?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener!.unsubscribe()
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <div className="mx-52 mt-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="categories" element={<Categories />} />
            <Route path="/:slug" element={<Templates />} />
            <Route path=":slug/:slug/:id" element={<Tier />} />
            <Route path="/create" element={<CreateTemplate />} />
            <Route path="/create/:slug" element={<MultipleContainers />} />
            <Route
              path="/login"
              element={
                user ? <Navigate replace to={"/dashboard"} /> : <Login />
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
