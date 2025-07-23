const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const actoresRoutes = require('./routes/actoresRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/actores', actoresRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
