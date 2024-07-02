const express = require('express');
const router = express.Router();
const connection = require('./database/db'); 


router.get('/', (req, res) => {
    connection.query('SELECT * FROM modulo', (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  });

  router.post('/', (req, res) => {
    const { nombre_modulo, fecha_inicio, fecha_fin } = req.body;
    const estado = 'Próximamente'; 

    const query = 'INSERT INTO modulo (nombre_modulo, estado, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)';
    connection.query(query, [nombre_modulo, estado, fecha_inicio, fecha_fin], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Módulo creado exitosamente' });
    });
});
router.put('/:id_modulo', (req, res) => {
  const { id_modulo } = req.params;
  const { nombre_modulo, fecha_inicio, fecha_fin, estado } = req.body;

  const query = 'UPDATE modulo SET nombre_modulo=?, estado=?, fecha_inicio=?, fecha_fin=? WHERE id_modulo=?';
  connection.query(query, [nombre_modulo, estado, fecha_inicio, fecha_fin, id_modulo], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: `Módulo ${id_modulo} actualizado exitosamente` });
  });
});

  
  module.exports = router;