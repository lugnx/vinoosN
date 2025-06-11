import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Administracion from './pages/Administracion';
import Login from './components/LoginBox';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<div className="page"><h2>Register Page</h2></div>} />
          <Route path="/logistica" element={<div className="page"><h2>Logística Page</h2></div>} />
          <Route path="/contaduria" element={<div className="page"><h2>Contaduría Page</h2></div>} />
          <Route path="/cajeria" element={<div className="page"><h2>Cajería Page</h2></div>} />
          <Route path="/usuarios" element={<div className="page"><h2>Usuarios Page</h2></div>} />
          <Route path="/proveedores" element={<div className="page"><h2>Proveedores Page</h2></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
