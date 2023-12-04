import React, { useState } from 'react'
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Counter from './pages/Counter'
import Input from './pages/Input'
import Input2 from './pages/Input2'
import List from './pages/List'
import RespondingEvents from './docs/RespondingEvents'
import StateComponent from './docs/StateComponent'
import StateSnapshot from './docs/StateSnapshot'
import QueueingState from './docs/QueueingState'
import UpdateObject from './docs/UpdateObject'

const reactIntroduction = (
  <>
    <Link to="/react-introduction/about">About</Link>
    <Link to="/react-introduction/counter">Counter</Link>
    <Link to="/react-introduction/input">Input</Link>
    <Link to="/react-introduction/input2">Input2</Link>
    <Link to="/react-introduction/list">List</Link>
  </>
)

const docsInteractivity = (
  <>
    <Link to="/react-docs-interactivity/responding-events">Responding Events</Link>
    <Link to="/react-docs-interactivity/state-component">State Component</Link>
    <Link to="/react-docs-interactivity/state-snapshot">State Snapshot</Link>
    <Link to="/react-docs-interactivity/queueing-state">Queueing State</Link>
    <Link to="/react-docs-interactivity/update-object">Update Object</Link>
  </>
)

const Navigation = () => {
  const location = useLocation()
  const currentPath =
    location.pathname === '/' ? (
      <h3>Home</h3>
    ) : (
      <h3>{location.pathname.split('/')[1].replace(/[/-]/g, ' ').toUpperCase()}</h3>
    )

  return (
    <nav>
      <div>{currentPath}</div>
      <div className="nav-link">
        <Link to="/">Home</Link>
        <Link to="/react-introduction">React Introduction</Link>
        {location.pathname.startsWith('/react-introduction') && (
          <div className="nav-link-child">{reactIntroduction}</div>
        )}
        <Link to="/react-docs-interactivity">React Docs - Interactivity</Link>
        {location.pathname.startsWith('/react-docs-interactivity') && (
          <div className="nav-link-child">{docsInteractivity}</div>
        )}
      </div>
    </nav>
  )
}

const NavContainer = ({ active, setActive }) => {
  const handleBtn = () => {
    setActive(!active)
  }

  return (
    <div className={`nav-container ${active ? 'active' : ''}`}>
      <button onClick={handleBtn}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      {active && <Navigation />}
    </div>
  )
}
function App() {
  const [active, setActive] = useState(true)
  return (
    <div className="App">
      <NavContainer active={active} setActive={setActive} />
      <div className={`main-content ${active ? 'active' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/react-introduction" element={<Outlet />}>
            <Route path="about" element={<About />} />
            <Route path="counter" element={<Counter />} />
            <Route path="input" element={<Input />} />
            <Route path="input2" element={<Input2 />} />
            <Route path="list" element={<List />} />
          </Route>
          <Route path="/react-docs-interactivity" element={<Outlet />}>
            <Route path="responding-events" element={<RespondingEvents />} />
            <Route path="state-component" element={<StateComponent />} />
            <Route path="state-snapshot" element={<StateSnapshot />} />
            <Route path="queueing-state" element={<QueueingState />} />
            <Route path="update-object" element={<UpdateObject />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
