import React from 'react'
import Home from './component/Home';
import About from './component/About';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteState from '../src/context/NoteState'
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
// import ReactDOM from 'react-dom'

function App() {
  return (
    <div className="App">
<>
<NoteState>
<Router>
<Navbar/>
<Alert message="this is message"/>
<div className="container">
  <Routes>
    <Route exact path="/about" element={<About />} />
    <Route  exact path="/" element={<Home />} />
    <Route  exact path="/login" element={<Login />} />
    <Route  exact path="/signup" element={<Signup />} />
  </Routes>
  </div>
</Router>
</NoteState>

    </>
    </div>

  );
}

export default App;
