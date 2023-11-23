// App.js
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import SnackBoard from './pages/SnackBoard'

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | <Link to="/snack-board/1">Snack Board</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snack-board" element={<SnackBoard />} />
        <Route path="/snack-board/:page" element={<SnackBoard />} />
      </Routes>
    </div>
  )
}

export default App
