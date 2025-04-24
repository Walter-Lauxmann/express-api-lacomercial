const db = require('../db');

exports.getFacturas = (req, res) => {
    db.query('SELECT * FROM facturas', (err, results) => {
        if(err) return res.status(500).json({error: err});
        res.json(results);
    });
};

exports.getFacturaId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM facturas WHERE id = ?', [id], (err,results) => {
        if(err) return res.status(500).json({error: err});
        if(results.length === 0) return res.status(404).json({mensaje: 'Factura no encontrada'});
        res.json(results[0]);
    });
};

exports.crearFactura = (req, res) => {
    const {nro_factura, fecha, tipo, id_cliente} = req.body;
    db.query('INSERT INTO facturas (nro_factura, fecha, tipo, id_cliente) VALUES (?, ?, ?, ?)', [nro_factura, fecha, tipo, id_cliente], (err, result) => {
        if(err) return res.status(500).json({error: err});
        res.status(201).json({id:result.insertId});
    });
};

exports.actualizarFactura = (req, res) => {
    const id = req.params.id;
    const {nro_factura, fecha, tipo, id_cliente} = req.body;
    db.query('UPDATE facturas SET nro_factura = ?, fecha = ?, tipo = ?, id_cliente = ?', [nro_factura, fecha, tipo, id_cliente], (err) => {
        if(err) return res.status(500).json({error: err});
        res.json({mensaje: 'Factura actualizada'});
    });
};

exports.borrarFactura = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM facturas WHERE id = ?', [id], (err) => {
        if(err) return res.status(500).json({error: err});
        res.json({mensaje: 'Factura eliminada'});
    });
};