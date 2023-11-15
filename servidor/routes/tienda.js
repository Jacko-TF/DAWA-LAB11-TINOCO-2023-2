//Rutas tienda
const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tiendaController');

//api/tiendas
router.post('/', tiendaController.crearTienda);
router.get('/', tiendaController.obtenerTiendas);
router.get('/distrito/:id', tiendaController.obtenerTiendasPorDistrito);
router.get('/distrito/map/:id', tiendaController.obtenerMapTiendaDistritoID);
router.put('/:id', tiendaController.actualizarTienda);
router.get('/:id', tiendaController.verTienda);
router.delete('/:id', tiendaController.eliminarTienda);

module.exports = router;