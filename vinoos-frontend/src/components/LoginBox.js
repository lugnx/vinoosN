import React, { useState } from 'react';
   import { useNavigate, Link } from 'react-router-dom';
   import axios from 'axios';
   import '../App.css';

   const Login = () => {
     const [nombre, setNombre] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [cambiarContrasena, setCambiarContrasena] = useState(false);
     const [error, setError] = useState('');
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         const response = await axios.post('http://localhost:3000/api/login', {
           nombre,
           email,
           password
         });
         if (response.data.message === 'Login exitoso') {
           navigate('/dashboard');
         }
       } catch (err) {
         setError(err.response?.data?.error || 'Error al iniciar sesión');
       }
     };

     return (
       <div className="page login-page">
         <div className="welcome-banner">
           <i className="fas fa-user banner-icon"></i>
           <h1>Iniciar Sesión</h1>
         </div>
         <form className="login-form" onSubmit={handleSubmit}>
           <div className="form-group">
             <label htmlFor="nombre">Nombre</label>
             <input
               type="text"
               id="nombre"
               value={nombre}
               onChange={(e) => setNombre(e.target.value)}
               required
             />
           </div>
           <div className="form-group">
             <label htmlFor="email">Email</label>
             <input
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
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
             />
           </div>
           <div className="form-group form-checkbox">
             <input
               type="checkbox"
               id="cambiarContrasena"
               checked={cambiarContrasena}
               onChange={(e) => setCambiarContrasena(e.target.checked)}
             />
             <label htmlFor="cambiarContrasena">Cambiar Contraseña</label>
           </div>
           {error && <p className="error-message">{error}</p>}
           <div className="form-buttons">
             <button type="submit" className="login-button">
               <i className="fas fa-check"></i> Confirmar
             </button>
             <Link to="/administracion" className="login-button">
               <i className="fas fa-arrow-left"></i> Regresar
             </Link>
           </div>
         </form>
       </div>
     );
   };

   export default Login;
