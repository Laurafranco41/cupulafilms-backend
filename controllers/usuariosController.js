const fs = require('fs');
const path = require('path');
const usuariosPath = path.join(__dirname, '../data/usuarios.json');

// Registrar nuevo usuario
const registrarUsuario = (req, res) => {
  const { usuario, contraseña } = req.body;
  if (!usuario || !contraseña) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  const usuarios = JSON.parse(fs.readFileSync(usuariosPath));
  const existe = usuarios.find(u => u.usuario === usuario);
  if (existe) {
    return res.status(409).json({ mensaje: 'Usuario ya existe' });
  }

  usuarios.push({ usuario, contraseña });
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
  res.json({ mensaje: 'Usuario registrado exitosamente' });
};

// Iniciar sesión
const loginUsuario = (req, res) => {
  const { usuario, contraseña } = req.body;
  const usuarios = JSON.parse(fs.readFileSync(usuariosPath));
  const existe = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);

  if (!existe) {
    return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }

  res.json({ mensaje: 'Autenticación exitosa' });
};

module.exports = { registrarUsuario, loginUsuario };
