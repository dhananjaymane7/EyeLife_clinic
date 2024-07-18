import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login/login';
import User from './user_panel/user';
import Admin from './admin_panel/admin';
import "./index.css";   
import LandingPage from './login/LandingPage';

function App() {
  const [user, setUser] = useState(null); // null, 'user', or 'admin' based on login state

  const handleLogin = (userType) => {
    setUser(userType); // Set user to 'admin' or 'user' based on login
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* LandingPage as the default route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/user" element={user === 'user' ? <User /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user === 'admin' ? <Admin /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
