import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Outlet />
      <footer>
        <a href="https://www.flaticon.com/free-icons/cloudy" title="cloudy icons">
          Cloudy icons created by Freepik - Flaticon
        </a>
      </footer>
    </>
  )
}
