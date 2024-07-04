const express = require('express');
const router = express.Router();
const connection = require('./database/db'); 

router.get('/', (req, res) => {
    connection.query('SELECT * FROM bootcamp', (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  });

  router.get('/modulos/:bootcampID', (req, res) => {
    const { bootcampID } = req.params;
    const query = 'SELECT * FROM modulo WHERE bootcampId = ? ORDER BY modulo.fecha_inicio';
  
    connection.query(query, [bootcampID], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: `Módulo con ID ${id} no encontrado` });
        }
        res.json(results);
    });
  });
  module.exports = router;
