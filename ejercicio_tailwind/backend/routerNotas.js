const express = require('express');
const router = express.Router();
const connection = require('./database/db');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM Notas';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

router.get('/:id_usuario', (req, res) => {
    const idUsuario = req.params.id_usuario;
    const query = `
        SELECT 
            usuarios.nombre AS nombre_usuario,
            modulo.nombre_modulo, modulo.id_modulo AS id_modulo,
            Notas.nota
        FROM 
            Notas
        JOIN 
            modulo ON Notas.id_modulo = modulo.id_modulo
        JOIN 
            usuarios ON Notas.id_usuario = usuarios.id
        WHERE 
            Notas.id_usuario = ?;
    `;
    connection.query(query, [idUsuario], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

router.put('/:id_usuario', (req, res) => {
    const idUsuario = req.params.id_usuario;
    const notas = req.body;
    console.log(idUsuario);
    console.log(notas);
    const queries = notas.map(nota => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Notas SET nota = ? WHERE id_usuario = ? AND id_modulo = ?';
            connection.query(query, [nota.nota, idUsuario, nota.id_modulo], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Resultado de la consulta:', result);
                    resolve(result);
                }
            });
        });
    });

    Promise.all(queries)
        .then(results => {
            res.status(200).json({ message: 'Notas actualizadas exitosamente' });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;
