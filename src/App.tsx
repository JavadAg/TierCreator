import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Categories from "./pages/Categories"
import Create from "./pages/Create"
import Home from "./pages/Home"
import Templates from "./pages/Templates"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="mx-52 mt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:slug" element={<Templates />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
