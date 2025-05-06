const mongoose = require('mongoose');

// Define el esquema de Usuario
const usuarioSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  identificacion: { type: String, unique: true },
  correo: { type: String, unique: true },
  contraseña: String, // hash en backend
  rol: { type: String, enum: ['coordinador', 'docente', 'estudiante'] },
  institucion: String,
  grado: { type: String, required: function () { return this.rol === 'estudiante'; } },
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', usuarioSchema);


