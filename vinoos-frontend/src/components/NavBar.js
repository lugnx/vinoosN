import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="menu-grid">
        <div className="menu-item">
          <Link to="/administracion">
            <i className="fas fa-cog"></i> Administración
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/logistica">
            <i className="fas fa-truck"></i> Logística
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/contaduria">
            <i className="fas fa-calculator"></i> Contaduría
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/cajeria">
            <i className="fas fa-cash-register"></i> Proveedor
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
