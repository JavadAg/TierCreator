import React, { createContext, useEffect, useState } from "react"
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
import { User } from "@supabase/supabase-js"
import TierPage from "./pages/TierPage"
import CreateTier from "./pages/CreateTier"
import Layout from "./components/Layout/Layout"
import RecentTiers from "./pages/RecentTiers"
import UserPage from "./pages/UserPage"
import CommunityRanking from "./pages/CommunityRanking"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})

function App() {
  const [user, setUser] = useState<User | null>()

  const [theme, setTheme] = useState(true)

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
          <div
            className={`w-full pt-2 px-2 font-Inter min-h-[80vh] sm:px-10 md:px-24 lg:px-40 xl:px-56 2xl:px-72 dark:bg-gray-900`}
          >
            <Routes>
              <Route path="/" element={<Navigate replace to="/home" />} />

              <Route path="/home" element={<Home />} />
              <Route path="categories" element={<Categories />} />
              <Route path="/:slug" element={<Templates />} />
              <Route path="/:slug?page=:page" element={<Templates />} />
              <Route path="/:slug/:slug" element={<CommunityRanking />} />
              <Route path=":slug/:slug/:id" element={<TierPage />} />
              <Route path="/create" element={<CreateTemplate />} />
              <Route path="/create/:slug" element={<CreateTier />} />
              <Route
                path="/login"
                element={user ? <Navigate replace to={"/"} /> : <Login />}
              />
              <Route path="/user/:userId" element={<UserPage />} />
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
