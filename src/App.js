import React ,{useState}from 'react'
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
  const [alert,setAlert] =useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <div className="App">
<>
<NoteState>
<Router>
<Navbar/>
<Alert alert={alert} />
<div className="container">
  <Routes>
    <Route exact path="/about" element={<About />} />
    <Route  exact path="/" element={<Home showAlert={showAlert} />} />
    <Route  exact path="/login" element={<Login showAlert={showAlert}/>} />
    <Route  exact path="/signup" element={<Signup showAlert={showAlert}/>} />
  </Routes>
  </div>
</Router>
</NoteState>

    </>
    </div>

  );
}

export default App;
