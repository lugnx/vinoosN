import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Login = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        nombre,
        email,
        password,
      });
      if (response.data.message === 'Login exitoso') {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="page login-page" style={{ borderTop: '5px solid #900C3F', borderBottom: '5px solid #900C3F' }}>
      <div className="welcome-banner">
        <i className="fas fa-user banner-icon"></i>
        <h1 style={{ color: '#000000' }}>Inicio Sesión</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ backgroundColor: '#DB7093', color: '#000000' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ backgroundColor: '#DB7093', color: '#000000' }}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-buttons" style={{ display: 'flex', justifyContent: 'space-between', width: '70%', margin: '0 auto' }}>
          <Link to="/administracion" className="login-button" style={{ backgroundColor: '#900C3F', color: '#FFF5E6' }}>
            <i className="fas fa-arrow-left"></i> Regresar
          </Link>
          <button type="submit" className="login-button" style={{ backgroundColor: '#900C3F', color: '#FFF5E6' }}>
            <i className="fas fa-check"></i> Iniciar Sesión
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/change-password" className="auth-link" style={{ color: '#5A0015' }}>
            Cambiar Contraseña
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
