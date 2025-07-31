const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const actoresPath = path.join(__dirname, '../data/actores.json');

// ✅ 1. Obtener todos los actores
const obtenerActores = (req, res) => {
  try {
    const data = fs.readFileSync(actoresPath, 'utf-8');
    const actores = JSON.parse(data);
    res.json(actores);
  } catch (error) {
    console.error('Error al leer actores:', error);
    res.status(500).json({ mensaje: 'Error al obtener los actores' });
  }
};

// ✅ 2. Crear un nuevo actor
const crearActor = (req, res) => {
  const { nombre, edad, rol } = req.body;

  if (!nombre || !edad || !rol) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  try {
    const data = fs.readFileSync(actoresPath, 'utf-8');
    const actores = JSON.parse(data);

    const nuevoActor = {
      id: Date.now(),
      nombre,
      edad,
      rol,
    };

    actores.push(nuevoActor);
    fs.writeFileSync(actoresPath, JSON.stringify(actores, null, 2));

    res.status(201).json({ mensaje: 'Actor creado con éxito', actor: nuevoActor });
  } catch (error) {
    console.error('Error al crear actor:', error);
    res.status(500).json({ mensaje: 'Error al crear el actor' });
  }
};

// ✅ 3. Eliminar un actor por ID
const eliminarActor = (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const data = fs.readFileSync(actoresPath, 'utf-8');
    let actores = JSON.parse(data);

    const existe = actores.some(actor => actor.id === id);
    if (!existe) {
      return res.status(404).json({ mensaje: 'Actor no encontrado' });
    }

    actores = actores.filter(actor => actor.id !== id);
    fs.writeFileSync(actoresPath, JSON.stringify(actores, null, 2));

    res.json({ mensaje: 'Actor eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar actor:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el actor' });
  }
};

// Exportar funciones
module.exports = {
  obtenerActores,
  crearActor,
  eliminarActor,
};
