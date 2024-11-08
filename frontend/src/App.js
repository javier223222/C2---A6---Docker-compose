import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [curso, setCurso] = useState('');

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      const response = await fetch('http://localhost:5000/alumnos');
      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.error('Error al obtener los alumnos:', error);
    }
  };

  const agregarAlumno = async () => {
    if (nombre && edad && curso) {
      try {
        const response = await fetch('http://localhost:5000/alumnos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, edad, curso }),
        });

        if (response.ok) {
          fetchAlumnos();
          setNombre('');
          setEdad('');
          setCurso('');
        } else {
          console.error('Error al agregar el alumno');
        }
      } catch (error) {
        console.error('Error al agregar el alumno:', error);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className="App">
      <h1>Gestión de Alumnos</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
        <input
          type="text"
          placeholder="Curso"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
        />
        <button onClick={agregarAlumno}>Agregar Alumno</button>
      </div>
      <div className="alumnos-list">
        <h2>Lista de Alumnos</h2>
        {alumnos.length > 0 ? (
          <ul>
            {alumnos.map((alumno) => (
              <li key={alumno.id}>
                {alumno.nombre} - {alumno.edad} años - {alumno.curso}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay alumnos disponibles</p>
        )}
      </div>
    </div>
  );
}

export default App;
