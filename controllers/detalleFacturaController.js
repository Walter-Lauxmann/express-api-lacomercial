const db = require('../db');

exports.getDetalleFacturas = (req, res) => {
    db.query('SELECT * FROM detalles_factura', (err, results) => {
        if(err) return res.status(500).json({error: err});
        res.json(results);
    });
};

exports.getDetalleFacturaId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM detalle_facturas WHERE id = ?', [id], (err,results) => {
        if(err) return res.status(500).json({error: err});
        if(results.length === 0) return res.status(404).json({mensaje: 'DetalleFacturas no encontrado'});
        res.json(results[0]);
    });
};

exports.crearDetalleFactura = (req, res) => {
    const {codigo, nombre, descripcion, precio, stock, imagen} = req.body;
    db.query('INSERT INTO detalle_facturas (codigo, nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)', [codigo, nombre, descripcion, precio, stock, imagen], (err, result) => {
        if(err) return res.status(500).json({error: err});
        res.status(201).json({id:result.insertId});
    });
};

exports.actualizarDetalleFactura = (req, res) => {
    const id = req.params.id;
    const {codigo, nombre, descripcion, precio, stock, imagen} = req.body;
    db.query('UPDATE detalle_facturas SET codigo = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?', [codigo, nombre, descripcion, precio, stock, imagen], (err) => {
        if(err) return res.status(500).json({error: err});
        res.json({mensaje: 'DetalleFacturas actualizado'});
    });
};

exports.borrarDetalleFactura = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM detalles_factura WHERE id = ?', [id], (err) => {
        if(err) return res.status(500).json({error: err});
        res.json({mensaje: 'DetalleFacturas eliminado'});
    });
};