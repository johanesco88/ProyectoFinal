// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const admin = require('../config/firebaseAdmin');
const Usuario = require('../models/Usuario'); // modelo Mongo
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const correo = decoded.email;

    // Buscar el usuario por su correo en tu DB Mongo
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no registrado en el sistema' });
    }

    // Opcional: generar tu propio JWT
    const customToken = jwt.sign(
      {
        uid: usuario._id,
        rol: usuario.rol,
        nombres: usuario.nombres,
        correo: usuario.correo
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token: customToken, usuario });

  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
});

module.exports = router;
