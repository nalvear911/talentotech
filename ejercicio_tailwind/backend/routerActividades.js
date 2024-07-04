const express = require('express');
const router = express.Router();
const connection = require('./database/db');

router.get('/', (req, res) => {
    const query = `
      SELECT a.id_actividad, a.id_usuario, u.nombre AS nombre_usuario, a.nombre_actividad, a.archivo, a.fecha_envio, a.calificacion, a.retroalimentacion, a.id_modulo
      FROM actividades a
      JOIN usuarios u ON a.id_usuario = u.id
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
      SELECT a.id_actividad, a.id_usuario, u.nombre AS nombre_usuario, a.nombre_actividad, a.archivo, a.fecha_envio, a.calificacion, a.retroalimentacion, a.id_modulo
      FROM actividades a
      JOIN usuarios u ON a.id_usuario = u.id
      WHERE a.id_actividad = ?
    `;
    connection.query(query, [id], (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else if (results.length === 0) {
        res.status(404).send('Actividad no encontrada');
      } else {
        res.status(200).json(results[0]);
      }
    });
  });
  
  router.post('/', (req, res) => {
    const { id_usuario, nombre_actividad, archivo, fecha_envio, calificacion, retroalimentacion, id_modulo } = req.body;
    const query = `
      INSERT INTO actividades (id_usuario, nombre_actividad, archivo, fecha_envio, calificacion, retroalimentacion, id_modulo)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, [id_usuario, nombre_actividad, archivo, fecha_envio, calificacion, retroalimentacion, id_modulo], (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).send(`Actividad creada con ID: ${results.insertId}`);
      }
    });
  });
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_usuario, nombre_actividad, archivo, fecha_envio, calificacion, retroalimentacion, id_modulo } = req.body;
    const query = `
      UPDATE actividades
      SET id_usuario = ?, nombre_actividad = ?, archivo = ?, fecha_envio = ?, calificacion = ?, retroalimentacion = ?, id_modulo = ?
      WHERE id_actividad = ?
    `;
    connection.query(query, [id_usuario, nombre_actividad, archivo, fecha_envio, calificacion, retroalimentacion, id_modulo, id], (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else if (results.affectedRows === 0) {
        res.status(404).send('Actividad no encontrada');
      } else {
        res.status(200).send('Actividad actualizada exitosamente');
      }
    });
  });
  

module.exports = router;
