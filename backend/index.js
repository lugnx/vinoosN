const express = require('express');
   const mysql = require('mysql2');
   const cors = require('cors');
   require('dotenv').config();

   const app = express();

   app.use(cors());
   app.use(express.json());

   // Configuración de la conexión a MySQL en Azure
   const db = mysql.createConnection({
     host: process.env.DB_HOST,
     port: process.env.DB_PORT,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     ssl: { rejectUnauthorized: true }
   });

   db.connect((err) => {
     if (err) {
       console.error('❌ Error conectando a la base:', err);
       return;
     }
     console.log('✅ Conectado a la base de datos');
   });

   // Endpoints API
   app.get('/api/usuarios', (req, res) => {
     db.query('SELECT * FROM usuarios', (err, results) => {
       if (err) {
         return res.status(500).json({ error: err.message });
       }
       res.json(results);
     });
   });

   app.get('/api/usuarios/:rol', (req, res) => {
     const rol = req.params.rol;
     db.query('SELECT * FROM usuarios WHERE rol = ?', [rol], (err, results) => {
       if (err) {
         return res.status(500).json({ error: err.message });
       }
       res.json(results);
     });
   });

   // Endpoint para login
   app.post('/api/login', (req, res) => {
     const { nombre, email, password } = req.body;
     if (!nombre || !email || !password) {
       return res.status(400).json({ error: 'Faltan nombre, email o contraseña' });
     }

     db.query('SELECT * FROM usuarios WHERE nombre = ? AND email = ? AND activo = TRUE', [nombre, email], (err, results) => {
       if (err) {
         return res.status(500).json({ error: 'Error en la base de datos: ' + err.message });
       }
       if (results.length === 0) {
         return res.status(401).json({ error: 'Credenciales incorrectas' });
       }

       const user = results[0];
       const hashedPassword = user.password_hash;
       db.query('SELECT SHA2(?, 256) AS hash', [password], (err, hashResult) => {
         if (err) {
           return res.status(500).json({ error: 'Error al verificar contraseña: ' + err.message });
         }
         if (hashResult[0].hash !== hashedPassword) {
           return res.status(401).json({ error: 'Credenciales incorrectas' });
         }

         // Actualizar ultimo_login
         db.query('UPDATE usuarios SET ultimo_login = NOW() WHERE usuario_id = ?', [user.usuario_id], (err) => {
           if (err) {
             console.error('Error al actualizar ultimo_login:', err);
           }
           res.json({ message: 'Login exitoso', user: { usuario_id: user.usuario_id, nombre: user.nombre, email: user.email, rol: user.rol } });
         });
       });
     });
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
   });
