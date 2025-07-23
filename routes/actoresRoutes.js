const express = require('express');
const router = express.Router();
const {
  obtenerActores,
  crearActor,
  eliminarActor
} = require('../controllers/actoresController');

router.get('/', obtenerActores);
router.post('/', crearActor);
router.delete('/:id', eliminarActor);

module.exports = router;
