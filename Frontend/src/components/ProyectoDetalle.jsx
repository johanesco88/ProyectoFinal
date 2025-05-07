import React, { useEffect, useState } from 'react';
import { getProyectoById, cambiarEstado } from '../services/api';
import { Typography, Box, Button } from '@mui/material';

const ProyectoDetalle = ({ proyectoId }) => {
  const [proyecto, setProyecto] = useState(null);

  const fetchProyecto = async () => {
    const res = await getProyectoById(proyectoId);
    setProyecto(res.data);
  };

  const handleCambiarEstado = async () => {
    await cambiarEstado(proyectoId, {
      nuevoEstado: 'Activo',
      observacion: 'Aprobado por el coordinador',
    });
    fetchProyecto();
  };

  useEffect(() => {
    if (proyectoId) fetchProyecto();
  }, [proyectoId]);

  if (!proyecto) return null;

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6">{proyecto.titulo}</Typography>
      <Typography>Área: {proyecto.area}</Typography>
      <Typography>Presupuesto: ${proyecto.presupuesto}</Typography>
      <Typography>Institución: {proyecto.institucion}</Typography>
      <Typography>Estado Actual: {proyecto.estado_actual}</Typography>
      <Button variant="outlined" onClick={handleCambiarEstado} sx={{ mt: 2 }}>
        Cambiar a Activo
      </Button>
    </Box>
  );
};

export default ProyectoDetalle;
