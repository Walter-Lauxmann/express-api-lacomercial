const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const clientesRoutes = require('./routes/clientes');
const productosRoutes = require('./routes/productos');
const proveedoresRoutes = require('./routes/proveedores');
const facturasRoutes = require('./routes/facturas');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/clientes', clientesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/facturas', facturasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});