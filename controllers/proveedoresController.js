const db = require('../db');

exports.getProveedores = (req, res) => {
    db.query('SELECT * FROM proveedores', (err, results) => {
        if(err) return res.status(500).json({error: err});
        res.json(results);
    });
};

exports.getProveedorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM proveedores WHERE id = ?', [id], (err,results) => {
        if(err) return res.status(500).json({error: err});
        if(results.length === 0) return res.status(404).json({mensaje: 'Proveedor no encontrado'});
        res.json(results[0]);
    });
};

exports.crearProveedor = (req, res) => {
    const {codigo, nombre, descripcion, precio, stock, imagen} = req.body;
    db.query('INSERT INTO proveedores (codigo, nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)', [codigo, nombre, descripcion, precio, stock, imagen], (err, result) => {
        if(err) return res.status(500).json({error: err});
        res.status(201).json({id:result.insertId});
    });
};

exports.actualizarProveedor = (req, res) => {
    const id = req.params.id;
    const {codigo, nombre, descripcion, precio, stock, imagen} = req.body;
    db.query('UPDATE proveedores SET codigo = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?', [codigo, nombre, descripcion, precio, stock, imagen], (err) => {
        if(err) return res.status(500).json({error: err});
        res.json({mensaje: 'Proveedor actualizado'});
    });
};

exports.borrarProveedor = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM proveedors WHERE id = ?', [id], (err) => {
        if(err) return res.status(500).json({error: err});
        res.json({mensaje: 'Proveedor eliminado'});
    });
};