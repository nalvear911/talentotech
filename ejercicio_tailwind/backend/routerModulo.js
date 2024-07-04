const express = require('express');
const router = express.Router();
const connection = require('./database/db');


router.get('/nombres', (req, res) => {
    const query = `
        SELECT 
            u.nombre AS estudiante, u.id AS id_estudiante,
            m.nombre_modulo AS modulo,
            n.nota
        FROM 
            Notas n
        JOIN 
            usuarios u ON n.id_usuario = u.id
        JOIN 
            modulo m ON n.id_modulo = m.id_modulo;
    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM modulo ';

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
       
        res.json(results);
    });
})


router.post('/', (req, res) => {
    const { nombre_modulo, fecha_inicio, fecha_fin, bootcampID } = req.body;
    const estado = 'Próximamente';

    const query = 'INSERT INTO modulo (nombre_modulo, estado, fecha_inicio, fecha_fin, bootcampID) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nombre_modulo, estado, fecha_inicio, fecha_fin, bootcampID], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Módulo creado exitosamente' });
    });
});


router.put('/:id_modulo', (req, res) => {
    const { id_modulo } = req.params;
    const { nombre_modulo, fecha_inicio, fecha_fin, estado, bootcampID } = req.body;

    const query = 'UPDATE modulo SET nombre_modulo=?, estado=?, fecha_inicio=?, fecha_fin=?, bootcampID=? WHERE id_modulo=?';
    connection.query(query, [nombre_modulo, estado, fecha_inicio, fecha_fin, bootcampID, id_modulo], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: `Módulo ${id_modulo} actualizado exitosamente` });
    });
});




module.exports = router;
