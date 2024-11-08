CREATE TABLE IF NOT EXISTS alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    curso VARCHAR(100)
);

INSERT INTO alumnos (nombre, edad, curso) VALUES 
('Juan Pérez', 21, 'Matemáticas'),
('Ana López', 22, 'Física'),
('Carlos García', 20, 'Informática');
