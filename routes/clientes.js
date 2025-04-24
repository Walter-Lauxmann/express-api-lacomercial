const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.get('/', clientesController.getClientes);
router.get('/:id', clientesController.getClienteId);
router.post('/', clientesController.crearCliente);
router.put('/:id', clientesController.actualizarCliente);
router.delete('/:id', clientesController.borrarCliente);

module.exports = router;