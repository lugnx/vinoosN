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

app.get('/api/inventario-bajo', (req, res) => {
  const limit = req.query.limit || 5;
  db.query('SELECT * FROM vista_inventario_bajo LIMIT ?', [parseInt(limit)], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/pedidos', (req, res) => {
  const limit = req.query.limit || 5;
  db.query('SELECT * FROM vista_resumen_pedidos WHERE estado = "pendiente" LIMIT ?', [parseInt(limit)], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

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

      db.query('UPDATE usuarios SET ultimo_login = NOW() WHERE usuario_id = ?', [user.usuario_id], (err) => {
        if (err) {
          console.error('Error al actualizar ultimo_login:', err);
        }
        res.json({ message: 'Login exitoso', user: { usuario_id: user.usuario_id, nombre: user.nombre, rol: user.rol } });
      });
    });
  });
});

app.post('/api/change-password', (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Faltan email o nueva contraseña' });
  }

  db.query('SELECT * FROM usuarios WHERE email = ? AND activo = TRUE', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la base de datos: ' + err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];
    db.query('SELECT SHA2(?, 256) AS hash', [newPassword], (err, hashResult) => {
      if (err) {
        return res.status(500).json({ error: 'Error al generar hash: ' + err.message });
      }
      const newHash = hashResult[0].hash;

      db.query('UPDATE usuarios SET password_hash = ?, cambiar_contrasena = FALSE WHERE usuario_id = ?', [newHash, user.usuario_id], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error al actualizar contraseña: ' + err.message });
        }
        res.json({ message: 'Contraseña actualizada exitosamente' });
      });
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
