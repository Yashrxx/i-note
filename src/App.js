import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/NotesState';
import Alert from './components/Alert';
import Login from './components/Login';
import { useState } from 'react';
import Signup from './components/Signup';
function App() {
  const[alert,setalert]=useState(null);
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
  })
  setTimeout(() => {
    setalert(null)
  }, 2000);
  }
  return (
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
    <Routes>
      <Route path="/" exact element={<Home showalert={showalert}/>}/>
      <Route path="/about" exact element={<About/>}/>
      <Route path="/login" exact element={<Login showalert={showalert}/>}/>
      <Route path="/Signup" exact element={<Signup showalert={showalert}/>}/>
    </Routes>
    </div>
    </Router>
    </NoteState>
  );
}

export default App;
