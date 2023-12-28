import React from 'react'
import { Routes, Route } from 'react-router-dom'

import TodayWeather from './pages/TodayWeather'
import Layout from './components/Layout'
import SummaryWeather from './pages/SummaryWeather'
import WeeklyWeather from './pages/WeeklyWeather'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<SummaryWeather />} />
          <Route path="/summary-weather" element={<SummaryWeather />} />
          <Route path="/today-weather" element={<TodayWeather />} />
          <Route path="/weekly-weather" element={<WeeklyWeather />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
