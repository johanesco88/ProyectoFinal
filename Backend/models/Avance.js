const mongoose = require('mongoose');

const AvanceSchema = new mongoose.Schema({
  proyectoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto',
    required: true
  },
  fecha: {
    type: String, // Puedes usar Date si prefieres validaciones automáticas
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  documentos: [
    {
      type: String // nombre o ruta del archivo PDF u otros
    }
  ],
  fotos: [
    {
      type: String // nombre o ruta de la imagen
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Avance', AvanceSchema);
