import React, { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom"
import Categories from "./pages/Categories"
import CreateTemplate from "./pages/CreateTemplate"
import Home from "./pages/Home"
import Templates from "./pages/Templates"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Login from "./pages/Login"
import { supabase } from "./utils/client"
import Dashboard from "./pages/Dashboard"
import { User } from "@supabase/supabase-js"
import Tier from "./pages/TierPage"
import CreateTier from "./pages/CreateTier"
import Template from "./pages/Template"
import Layout from "./components/Layout/Layout"
import RecentTiers from "./pages/RecentTiers"

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
        <Layout>
          <div className="w-full mt-2 px-2 font-Roboto">
            <Routes>
              <Route path="/" element={<Navigate replace to="/home" />} />

              <Route path="/home" element={<Home />} />
              <Route path="categories" element={<Categories />} />
              <Route path="/:slug" element={<Templates />} />
              <Route path="/:slug?page=:page" element={<Templates />} />
              <Route path="/:slug/:slug" element={<Template />} />
              <Route path=":slug/:slug/:id" element={<Tier />} />
              <Route path="/create" element={<CreateTemplate />} />
              <Route path="/create/:slug" element={<CreateTier />} />
              <Route
                path="/login"
                element={
                  user ? <Navigate replace to={"/dashboard"} /> : <Login />
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/recent-tiers" element={<RecentTiers />} />
              <Route path="/:slug/recent-tiers" element={<RecentTiers />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App
