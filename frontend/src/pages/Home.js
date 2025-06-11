import React from 'react';
   import { Link } from 'react-router-dom';
   import '../App.css';

   const Home = () => {
     return (
       <div className="home">
         <div className="auth-links">
           <Link to="/login" className="auth-link">
             <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
           </Link>
           <Link to="/register" className="auth-link">
             <i className="fas fa-user-plus"></i> Registrarse
           </Link>
         </div>
         <div className="welcome-banner">
           <i className="fas fa-wine-glass-alt banner-icon"></i>
           <h1>Bienvenido a Vinoos</h1>
         </div>
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
                 <i className="fas fa-cash-register"></i> Cajería
               </Link>
             </div>
           </div>
         </nav>
       </div>
     );
   };

   export default Home;
