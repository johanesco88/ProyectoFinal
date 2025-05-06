const express = require('express');
const router = express.Router();
const Proyecto = require('../models/Proyecto');

// GET todos los proyectos
router.get('/', async (req, res) => {
  const proyectos = await Proyecto.find();
  res.json(proyectos);
});

// POST crear proyecto
router.post('/', async (req, res) => {
  const nuevoProyecto = new Proyecto(req.body);
  await nuevoProyecto.save();
  res.status(201).json(nuevoProyecto);
});

// Actualizar un proyecto
router.put('/:id', async (req, res) => {
    const proyectoActualizado = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(proyectoActualizado);
  });
  
  // Eliminar un proyecto
  router.delete('/:id', async (req, res) => {
    await Proyecto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Proyecto eliminado' });
  });
  

module.exports = router;
