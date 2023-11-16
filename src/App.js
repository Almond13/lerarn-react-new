import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import SnackBoard from './pages/SnackBoard'

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | <Link to="/SnackBoard">Snack Board</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SnackBoard" element={<SnackBoard />} />
      </Routes>
    </div>
  )
}

export default App
