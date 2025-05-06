
const mongoose = require('mongoose');


const ProyectoSchema = new mongoose.Schema({
  titulo: String,
  area: String,
  objetivos: [
    {
      descripcion: String,
      avances: [
        {
          estudianteId: String,
          fecha: Date,
          descripcion: String,
          documentos: [String], // rutas o URLs
          fotos: [String] // rutas o URLs
        }
      ]
    }
  ],
  cronograma: String,
  presupuesto: Number,
  institucion: String,
  docenteId: String,
  integrantes: [
    {
      usuarioId: String,
      rol: { type: String, enum: ['estudiante', 'docente'] }
    }
  ],
  observaciones: String,
  estado_actual: {
    type: String,
    enum: ['Formulación', 'Evaluación', 'Activo', 'Inactivo', 'Finalizado'],
    default: 'Formulación'
  },
  historial_estados: [
    {
      estado: String,
      fecha: Date,
      observacion: String
    }
  ],
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);

