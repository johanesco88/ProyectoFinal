// Obtener todos los proyectos (RF-11)
const Proyecto = require('../models/Proyecto');

// Crear nuevo proyecto (RF-04)
exports.crearProyecto = async (req, res) => {
  try {
    const nuevoProyecto = new Proyecto(req.body);
    await nuevoProyecto.save();
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};



exports.obtenerProyectos = async (req, res) => {
    try {
      const proyectos = await Proyecto.find();
      res.json(proyectos);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  // Obtener proyecto por ID (RF-12)
exports.obtenerProyectoPorId = async (req, res) => {
    try {
      const proyecto = await Proyecto.findById(req.params.id);
      if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
      res.json(proyecto);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  };
  
  // Actualizar proyecto (RF-05)
  exports.actualizarProyecto = async (req, res) => {
    try {
      const proyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(proyecto);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  };
  
  // Eliminar proyecto
  exports.eliminarProyecto = async (req, res) => {
    try {
      await Proyecto.findByIdAndDelete(req.params.id);
      res.json({ mensaje: 'Proyecto eliminado' });
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  };
  
  // Agregar avance (RF-06, RF-07)
  exports.agregarAvance = async (req, res) => {
    try {
      const { objetivoIndex } = req.params;
      const { estudianteId, fecha, descripcion, documentos, fotos } = req.body;
  
      const proyecto = await Proyecto.findById(req.params.id);
      if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
  
      proyecto.objetivos[objetivoIndex].avances.push({ estudianteId, fecha, descripcion, documentos, fotos });
      await proyecto.save();
      res.json(proyecto);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  };
  
  // Cambiar estado del proyecto (RF-08)
  exports.cambiarEstadoProyecto = async (req, res) => {
    try {
      const { nuevoEstado, observacion } = req.body;
      const proyecto = await Proyecto.findById(req.params.id);
  
      if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
  
      proyecto.estado_actual = nuevoEstado;
      proyecto.historial_estados.push({ estado: nuevoEstado, fecha: new Date(), observacion });
      await proyecto.save();
      res.json(proyecto);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  };
  
  // Búsqueda de proyectos por criterios (RF-11)
  exports.buscarProyectos = async (req, res) => {
    const { titulo, area, institucion, docenteId } = req.query;
    const query = {};
  
    if (titulo) query.titulo = { $regex: titulo, $options: 'i' };
    if (area) query.area = area;
    if (institucion) query.institucion = institucion;
    if (docenteId) query.docenteId = docenteId;
  
    try {
      const resultados = await Proyecto.find(query);
      res.json(resultados);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  };