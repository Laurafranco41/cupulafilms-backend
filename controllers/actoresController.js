const fs = require('fs');
const path = require('path');
const actoresPath = path.join(__dirname, '../data/actores.json');

// Listar actores
const obtenerActores = (req, res) => {
  const actores = JSON.parse(fs.readFileSync(actoresPath));
  res.json(actores);
};

// Crear nuevo actor
const crearActor = (req, res) => {
  const { nombre, edad } = req.body;
  if (!nombre || !edad) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  const actores = JSON.parse(fs.readFileSync(actoresPath));
  const nuevoActor = { id: Date.now(), nombre, edad };
  actores.push(nuevoActor);
  fs.writeFileSync(actoresPath, JSON.stringify(actores, null, 2));
  res.json({ mensaje: 'Actor creado', actor: nuevoActor });
};

// Eliminar actor
const eliminarActor = (req, res) => {
  const id = parseInt(req.params.id);
  let actores = JSON.parse(fs.readFileSync(actoresPath));
  actores = actores.filter(a => a.id !== id);
  fs.writeFileSync(actoresPath, JSON.stringify(actores, null, 2));
  res.json({ mensaje: 'Actor eliminado' });
};

module.exports = { obtenerActores, crearActor, eliminarActor };
