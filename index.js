const express = require('express');
const cors = require('cors');
const actoresRoutes = require('./routes/actoresRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');


const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());


// Rutas
app.use('/api/actores', actoresRoutes);
app.use('/api/auth', usuariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Cúpula Films está funcionando 🎬');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
