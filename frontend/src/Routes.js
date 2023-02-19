import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './Register';
import App from './App';

export default function Routing() {
    
  return (
    <div>
    <Router>
      
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/signup" element={<Register/>}/>
        {/* <Route path="/login" element={<LoginPage />}/> */}
        {/* <Route path="/logout" element={<Logout />}/> */}
      </Routes>

    
    </Router>
    
    
    </div>
  )
}
