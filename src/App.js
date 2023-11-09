import React from "react";
import {Routes, Route, Link} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Counter from "./pages/Counter";
import Input from "./pages/Input";
import Input2 from "./pages/Input2";
import List from "./pages/List";
import RespondingEvents from "./docs/RespondingEvents";

function App() {
  return (
    <div className="App">
        <nav>
            {/*<a href="/">Home</a>*/}
            {/*아래와 같음*/}
            <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/counter">Counter</Link> |{" "}
            <Link to="/input">Input</Link> | <Link to="/input2">Input2</Link> | <Link to="/list">List</Link> |{" "}
            <Link to="/respondingEvents">RespondingEvents</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/input" element={<Input />} />
            <Route path="/input2" element={<Input2 />} />
            <Route path="/list" element={<List />} />
            <Route path="/respondingEvents" element={<RespondingEvents />} />
        </Routes>
      {/*<Home />*/}
    </div>
  );
}

export default App;
