const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// GET - obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// GET - obtener usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar usuario' });
  }
};

// POST - crear nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const { nombres, apellidos, identificacion, correo, contraseña, rol, institucion, grado } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombres,
      apellidos,
      identificacion,
      correo,
      contraseña: hashedPassword,
      rol,
      institucion,
      grado
    });

    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear usuario', error });
  }
};

// PUT - actualizar usuario
exports.updateUsuario = async (req, res) => {
  try {
    const { contraseña, ...resto } = req.body;
    if (contraseña) {
      resto.contraseña = await bcrypt.hash(contraseña, 10);
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, resto, { new: true });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar usuario', error });
  }
};

// DELETE - eliminar usuario
exports.deleteUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
