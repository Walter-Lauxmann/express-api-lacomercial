const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.getProductos);
router.get('/:id', productosController.getProductoId);
router.post('/', productosController.crearProducto);
router.put('/:id', productosController.actualizarProducto);
router.delete('/:id', productosController.borrarProducto);

module.exports = router;