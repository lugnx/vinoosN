import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const AuthLinks = () => {
  return (
    <div className="auth-links">
      <Link to="/login" className="auth-link">
        <i className="fas fa-user"></i> Iniciar Sesión
      </Link>
      <Link to="/register" className="auth-link">
        <i className="fas fa-user-plus"></i> Registrarse
      </Link>
    </div>
  );
};

export default AuthLinks;
