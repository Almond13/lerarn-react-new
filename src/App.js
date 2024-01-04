import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { GridProvider } from './contexts/GridContext'

import TodayWeather from './pages/TodayWeather'
import Layout from './components/Layout'
import SummaryWeather from './pages/SummaryWeather'
import WeeklyWeather from './pages/WeeklyWeather'

function App() {
  return (
    <div className="App">
      <GridProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<SummaryWeather />} />
            <Route path="/summary-weather" element={<SummaryWeather />} />
            <Route path="/today-weather" element={<TodayWeather />} />
            <Route path="/weekly-weather" element={<WeeklyWeather />} />
          </Route>
        </Routes>
      </GridProvider>
    </div>
  )
}

export default App
