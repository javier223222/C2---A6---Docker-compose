const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors= require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'alumnos_db'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener todos los alumnos
app.get('/alumnos', (req, res) => {
  db.query('SELECT * FROM alumnos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    res.status(200).json(results);
  });
});

// Ruta para obtener un alumno por ID
app.get('/alumnos/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM alumnos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el alumno' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.status(200).json(results[0]);
  });
});

// Ruta para agregar un nuevo alumno
app.post('/alumnos', (req, res) => {
  const { nombre, edad, curso } = req.body;
  if (!nombre || !edad || !curso) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  db.query('INSERT INTO alumnos (nombre, edad, curso) VALUES (?, ?, ?)', [nombre, edad, curso], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al agregar el alumno' });
    }
    res.status(201).json({ message: 'Alumno agregado', id: results.insertId });
  });
});

// Ruta para actualizar un alumno
app.put('/alumnos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, edad, curso } = req.body;
  db.query('UPDATE alumnos SET nombre = ?, edad = ?, curso = ? WHERE id = ?', [nombre, edad, curso, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el alumno' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.status(200).json({ message: 'Alumno actualizado' });
  });
});

// Ruta para eliminar un alumno
app.delete('/alumnos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM alumnos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el alumno' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.status(200).json({ message: 'Alumno eliminado' });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
