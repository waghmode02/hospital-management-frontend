import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home"
import Admin from "./components/Admin.jsx"
import Doctor from './Doctor/Doctor.jsx';
import AllAppointments from './components/AllAppointments.jsx'
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route  path="/admin" element={<Admin/>}/>
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/appointments" element={<AllAppointments/>} />

      </Routes>
    </Router>
  );
}

export default App;
