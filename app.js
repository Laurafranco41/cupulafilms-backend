// 1. Importaciones
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const actoresRoutes = require('./routes/actoresRoutes');

// 2. Inicializar la app
const app = express();

// 3. Middlewares
app.use(cors());
app.use(express.json()); // Reemplaza a body-parser

// 4. Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/actores', actoresRoutes);

// 5. Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
