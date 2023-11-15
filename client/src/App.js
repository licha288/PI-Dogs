import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from './Components/Home/Home';
import Landing from './Components/Landing/Landing';

function App() {
  
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </div>
  );
}

export default App;

