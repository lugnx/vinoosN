import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/change-password', {
        email,
        newPassword,
      });
      setSuccess(response.data.message);
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cambiar contraseña');
      setSuccess('');
    }
  };

  return (
    <div className="page change-password-page" style={{ borderTop: '5px solid #900C3F', borderBottom: '5px solid #900C3F' }}>
      <div className="welcome-banner">
        <i className="fas fa-lock banner-icon"></i>
        <h1 style={{ color: '#000000' }}>Cambiar Contraseña</h1>
      </div>
      <form className="change-password-form" onSubmit={handleSubmit}>
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
          <label htmlFor="newPassword">Nueva Contraseña</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ backgroundColor: '#DB7093', color: '#000000' }}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p style={{ color: '#5A0015' }}>{success}</p>}
        <div className="form-buttons" style={{ display: 'flex', justifyContent: 'center', width: '70%', margin: '0 auto' }}>
          <button type="submit" className="login-button" style={{ backgroundColor: '#900C3F', color: '#FFF5E6' }}>
            <i className="fas fa-check"></i> Cambiar Contraseña
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/login" className="auth-link" style={{ color: '#5A0015' }}>
            Regresar al Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
