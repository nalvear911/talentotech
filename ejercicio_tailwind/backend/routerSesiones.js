const express = require('express');
const router = express.Router();
const connection = require('./database/db');

router.get('/:moduloID', (req, res) => {
    const { moduloID } = req.params;
    const query = `
    SELECT s.*, m.nombre_modulo 
    FROM sesiones s
    JOIN modulo m ON s.moduloID = m.id_modulo
    WHERE s.moduloID = ?
    ORDER BY s.fecha;
    `;
    connection.query(query, [moduloID], (err, results) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    res.json(results);
    });
});
router.get('/getSesion/:idSesion', (req, res) => {
    const { idSesion } = req.params;
    const query = `
    SELECT * FROM sesiones WHERE id= ?`;
    connection.query(query, [idSesion], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
        });
});

router.post('/', (req, res) => {
    const { nombre_sesion,  fecha, moduloID } = req.body;
    const estado = 'Próximamente';
    const query = 'INSERT INTO sesiones (nombre_sesion, estado, fecha, moduloID) VALUES (?, ?, ?, ?)';
    connection.query(query, [nombre_sesion, estado, fecha, moduloID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Sesión creada exitosamente', sessionId: results.insertId });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_sesion, estado, fecha } = req.body;
    const query = `
    UPDATE sesiones 
    SET nombre_sesion = ?, estado = ?, fecha = ? 
    WHERE id = ?
    `;
    connection.query(query, [nombre_sesion, estado, fecha, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Sesión no encontrada' });
        }
        res.json({ message: 'Sesión actualizada exitosamente' });
    });
});
module.exports = router;
