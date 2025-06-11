import React from 'react';
   import { Link } from 'react-router-dom';
   import '../App.css';

   const Administracion = () => {
     return (
       <div className="page admin-page">
         <div className="welcome-banner">
           <i className="fas fa-cog banner-icon"></i>
           <h1>¿Qué deseas hacer hoy?</h1>
         </div>
         <div className="admin-options">
           <Link to="/login" className="admin-button">
             <i className="fas fa-user"></i> Iniciar Sesión
           </Link>
           <Link to="/register" className="admin-button">
             <i className="fas fa-user-plus"></i> Registrarse
           </Link>
           <Link to="/" className="admin-button">
             <i className="fas fa-arrow-left"></i> Regresar
           </Link>
         </div>
       </div>
     );
   };

   export default Administracion;
