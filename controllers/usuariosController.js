const fs = require('fs');
const path = require('path');

const usuariosPath = path.join(__dirname, '../data/usuarios.json');

// Asegura que el archivo exista al iniciar
if (!fs.existsSync(usuariosPath)) {
  fs.writeFileSync(usuariosPath, '[]', 'utf8');
}

// Registrar nuevo usuario
const registrarUsuario = (req, res) => {
  try {
    const { usuario, correo, contraseña } = req.body;

    if (!usuario || !correo || !contraseña) {
      return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
    }

    const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
    const existe = usuarios.find(u => u.usuario === usuario || u.correo === correo);

    if (existe) {
      return res.status(409).json({ mensaje: 'El usuario o correo ya están registrados' });
    }

    usuarios.push({ usuario, correo, contraseña });
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2), 'utf8');

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Iniciar sesión
const loginUsuario = (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
      return res.status(400).json({ mensaje: 'Faltan credenciales' });
    }

    const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
    const existe = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);

    if (!existe) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    res.status(200).json({ mensaje: 'Autenticación exitosa' });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { registrarUsuario, loginUsuario };
