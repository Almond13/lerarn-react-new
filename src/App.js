import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
