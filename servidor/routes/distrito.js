//Rutas distrito
const express = require('express');
const router = express.Router();
const distritoController = require('../controllers/distritoController');

//api/distritos
router.post('/', distritoController.crearDistrito);
router.get('/', distritoController.obtenerDistritos);
router.put('/:id', distritoController.actualizarDistrito);
router.delete('/:id', distritoController.eliminarDistrito);
router.get('/map', distritoController.obtenerMapDistrito)

module.exports = router;