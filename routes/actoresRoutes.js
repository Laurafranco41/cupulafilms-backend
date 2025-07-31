const express = require('express');
const router = express.Router();
const {
  obtenerActores,
  crearActor,
  eliminarActor
} = require('../controllers/actoresController');

router.get('/', obtenerActores);      // GET /api/actores
router.post('/', crearActor);         // POST /api/actores
router.delete('/:id', eliminarActor); // DELETE /api/actores/:id

module.exports = router;
