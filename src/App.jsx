import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from "../pages/landing";
import Login from "../pages/login";
import Register from "../pages/register";
import Navbar from "../components/Navbar"; // Optional if Navbar is used globally
import Todo from "../pages/Todo"; // Import your Todo component

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Todo" element={<Todo />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
