const express = require('express');
const router = express.Router();
const Proyecto = require('../models/Proyecto');
const proyectoController = require('../controllers/proyectos.controller')

router.get('/', proyectoController.obtenerProyectos);
router.post('/', proyectoController.crearProyecto);
router.get('/buscar', proyectoController.buscarProyectos); // RF-11
router.get('/:id', proyectoController.obtenerProyectoPorId);
router.put('/:id', proyectoController.actualizarProyecto);
router.delete('/:id', proyectoController.eliminarProyecto);


router.post('/:id/objetivos/:objetivoIndex/avances', proyectoController.agregarAvance);

// Estados
router.post('/:id/estado', proyectoController.cambiarEstadoProyecto);

module.exports = router;
