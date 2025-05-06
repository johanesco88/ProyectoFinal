const express = require('express');
const router = express.Router();
const Avance = require('../models/Avance');

// GET todos los avances
router.get('/', async (req, res) => {
  const avances = await Avance.find();
  res.json(avances);
});

// POST crear avance
router.post('/', async (req, res) => {
  const nuevoAvance = new Avance(req.body);
  await nuevoAvance.save();
  res.status(201).json(nuevoAvance);
});

// PUT actualizar avance
router.put('/:id', async (req, res) => {
  const avanceActualizado = await Avance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(avanceActualizado);
});

// DELETE eliminar avance
router.delete('/:id', async (req, res) => {
  await Avance.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Avance eliminado' });
});

module.exports = router;
