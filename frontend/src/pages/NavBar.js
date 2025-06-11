import React from 'react';
   import { Link } from 'react-router-dom';
   import '../App.css';

   const NavBar = () => {
     return (
       <nav className="navbar">
         <div className="menu-grid">
           <div className="menu-item">
             <Link to="/precio">
               <i className="fas fa-dollar-sign"></i> Precio
             </Link>
           </div>
           <div className="menu-item">
             <Link to="/tipos">
               <i className="fas fa-wine-glass-alt"></i> Tipos de Vino
             </Link>
           </div>
           <div className="menu-item">
             <Link to="/region">
               <i className="fas fa-map-marker-alt"></i> Región
             </Link>
           </div>
           <div className="menu-item">
             <Link to="/promociones">
               <i className="fas fa-gift"></i> Promociones
             </Link>
           </div>
         </div>
       </nav>
     );
   };

   export default NavBar;
