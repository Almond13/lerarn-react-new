import React, { useState, useRef } from 'react'
import '../styles/layoutCss.css'
import { Outlet, NavLink, Link } from 'react-router-dom'

const Sidebar = ({ open, setOpen }) => {
  const width = 280
  const [positionX, setPositionX] = useState(0)
  const side = useRef()
  const [toggleTitle, setToggleTitle] = useState('메뉴 숨기기')

  function toggleMenu() {
    if (positionX > 0) {
      setPositionX(0)
      setOpen((prevOpen) => !prevOpen)
      setToggleTitle('메뉴 숨기기')
    } else {
      setPositionX(230)
      setOpen((prevOpen) => !prevOpen)
      setToggleTitle('메뉴 표시')
    }
  }

  return (
    <div
      ref={side}
      className="side-bar-wrap"
      style={{ width: `${width}px`, transform: `translatex(${-positionX}px)` }}
    >
      <div className="side-bar-container">
        <div className="logo-wrap">
          {open ? (
            <div className="logo">
              <Link to="/">
                <img src="/images/cloudy32.ico" alt="logo" />
              </Link>
              <Link to="/">
                <h4>Clothes by Weather</h4>
              </Link>
              <button title={toggleTitle} onClick={() => toggleMenu()}>
                &lt;&lt;
              </button>
            </div>
          ) : (
            <div className="logo">
              <img
                src="/images/cloudy32.ico"
                alt="logo"
                title={toggleTitle}
                onClick={() => toggleMenu()}
              />
            </div>
          )}
        </div>
        {open && (
          <nav>
            {/*<NavLink to="/">Home</NavLink>*/}
            <NavLink to="/summary-weather">
              <p>Summary Weather</p>
            </NavLink>
            <NavLink to="/today-weather">
              <p>Today Weather</p>
            </NavLink>
            <NavLink to="/weekly-weather">
              <p>Weekly Weather</p>
            </NavLink>
          </nav>
        )}
      </div>
    </div>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(true)
  return (
    <div className={`layout-container ${open ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar open={open} setOpen={setOpen} />
      <div className="right-container">
        <div className="main-content">
          <Outlet />
        </div>
        <footer>
          <a href="https://www.flaticon.com/free-icons/cloudy" title="cloudy icons">
            Cloudy icons created by Freepik - Flaticon
          </a>
        </footer>
      </div>
    </div>
  )
}
