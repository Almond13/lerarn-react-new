import React from 'react'
import { Routes, Route } from 'react-router-dom'

import TodayWeather from './pages/TodayWeather'
import Layout from './components/Layout'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<TodayWeather />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
