const db = require('../db');

exports.getProductos = (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if(err) return res.status(500).json({error: err});
        res.json(results);
    });
};

exports.getProductoId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM productos WHERE id = ?', [id], (err,results) => {
        if(err) return res.status(500).json({error: err});
        if(results.length === 0) return res.status(404).json({mensaje: 'Producto no encontrado'});
        res.json(results[0]);
    });
};

exports.crearProducto = (req, res) => {
    const {codigo, nombre, descripcion, precio, stock, imagen} = req.body;
    db.query('INSERT INTO productos (codigo, nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)', [codigo, nombre, descripcion, precio, stock, imagen], (err, result) => {
        if(err) return res.status(500).json({error: err});
        res.status(201).json({id:result.insertId});
    });
};

exports.actualizarProducto = (req, res) => {
    const id = req.params.id;
    const {codigo, nombre, descripcion, precio, stock, imagen} = req.body;
    db.query('UPDATE productos SET codigo = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?', [codigo, nombre, descripcion, precio, stock, imagen], (err) => {
        if(err) return res.status(500).json({error: err});
        res.json({mensaje: 'Producto actualizado'});
    });
};

exports.borrarProducto = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
        if(err) return res.status(500).json({error: err});
        res.json({mensaje: 'Producto eliminado'});
    });
};