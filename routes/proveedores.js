const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController');

router.get('/', proveedoresController.getProveedores);
router.get('/:id', proveedoresController.getProveedorId);
router.post('/', proveedoresController.crearProveedor);
router.put('/:id', proveedoresController.actualizarProveedor);
router.delete('/:id', proveedoresController.borrarProveedor);

module.exports = router;