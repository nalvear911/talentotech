const express = require('express');
const router = express.Router();
const conexion = require('./database/db');

router.get('/', (req, res) => {
  conexion.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      console.log(error);
    } else {
        res.json(results);
      }
  });
});

router.get('/tipos-documento', (req, res) => {
    conexion.query('SELECT * FROM tipos_documento', (error, results) => {
        if (error) {
            console.log(error);
          } else {
              res.json(results);
            }
    })
})



router.get('/selectAll', (req, res) => {
  const query = `
    SELECT u.id, u.nombre, u.ciudad, u.edad, td.tipo as tipo_documento, u.num_documento, u.email, u.contrasena, r.tipo as rol
    FROM usuarios u
    JOIN tipos_documento td ON u.tipo_documento = td.id_tipo_documento
    JOIN rol r ON u.rol = r.id_rol
  `;
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT u.id, u.nombre, u.ciudad, u.edad, td.tipo as tipo_documento, u.num_documento, u.email, u.contrasena, r.tipo as rol
    FROM usuarios u
    JOIN tipos_documento td ON u.tipo_documento = td.id_tipo_documento
    JOIN rol r ON u.rol = r.id_rol
    WHERE u.id = ?
  `;
  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else if (results.length === 0) {
      res.status(404).send('Usuario no encontrado');
    } else {
      res.status(200).json(results[0]);
    }
  });
});


router.post('/', (req, res) => {
  const { nombre, ciudad, edad, tipo_documento, num_documento, email, contrasena, rol } = req.body;
  const query = 'INSERT INTO usuarios (nombre, ciudad, edad, tipo_documento, num_documento, email, contrasena, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [nombre, ciudad, edad, tipo_documento, num_documento, email, contrasena, rol], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send(`Usuario creado con ID: ${results.insertId}`);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, ciudad, edad, tipo_documento, num_documento, email, contrasena, rol } = req.body;
  const query = 'UPDATE usuarios SET nombre = ?, ciudad = ?, edad = ?, tipo_documento = ?, num_documento = ?, email = ?, contrasena = ?, rol = ? WHERE id = ?';
  connection.query(query, [nombre, ciudad, edad, tipo_documento, num_documento, email, contrasena, rol, id], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else if (results.affectedRows === 0) {
      res.status(404).send('Usuario no encontrado');
    } else {
      res.status(200).send('Usuario actualizado exitosamente');
    }
  });
});

router.get('/:id/rol', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT r.tipo as rol
    FROM usuarios u
    JOIN rol r ON u.rol = r.id_rol
    WHERE u.id = ?
  `;
  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else if (results.length === 0) {
      res.status(404).send('Usuario no encontrado');
    } else {
      res.status(200).json(results[0]);
    }
  });
});


module.exports = router;