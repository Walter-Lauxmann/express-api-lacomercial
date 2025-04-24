const express = require('express');
const router = express.Router();
const facturasController = require('../controllers/facturasController');

router.get('/', facturasController.getFacturas);
router.get('/:id', facturasController.getFacturaId);
router.post('/', facturasController.crearFactura);
router.put('/:id', facturasController.actualizarFactura);
router.delete('/:id', facturasController.borrarFactura);

module.exports = router;