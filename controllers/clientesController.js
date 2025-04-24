const db = require('../db');

exports.getClientes = (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if(err) return res.status(500).json({error: err});
        res.json(results);
    });
};

exports.getClienteId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM clientes WHERE id = ?', [id], (err,results) => {
        if(err) return res.status(500).json({error: err});
        if(results.length === 0) return res.status(404).json({mensaje: 'Cliente no encontrado'});
        res.json(results[0]);
    });
};

exports.crearCliente = (req, res) => {
    const {nombre, apellido, direccion, cuit} = req.body;
    db.query('INSERT INTO clientes (nombre, apellido. direccion, cuit) VALUES (?, ?, ?, ?)', [nombre, apellido, direccion, cuit], (err, result) => {
        if(err) return res.status(500).json({error: err});
        res.status(201).json({id:result.insertId});
    });
};

exports.actualizarCliente = (req, res) => {
    const id = req.params.id;
    const {nombre, apellido, direccion, cuit} = req.body;
    db.query('UPDATE clientes SET nombre = ?, apellido = ?, direccion = ?, cuit = ?', [nombre, apellido, direccion, cuit], (err) => {
        if(err) return res.status(500).json({error: err});
        res.json({mensaje: 'Cliente actualizado'});
    });
};

exports.borrarCliente = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
        if(err) return res.status(500).json({error: err});
        res.json({mensaje: 'Cliente eliminado'});
    });
};