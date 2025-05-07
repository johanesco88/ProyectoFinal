import React, { useState } from 'react';
import { createProyecto } from '../services/api';
import { TextField, Button, Typography, Box } from '@mui/material';

const ProyectoForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    area: '',
    cronograma: '',
    presupuesto: 0,
    institucion: '',
    observaciones: '',
    docenteId: '',
    integrantes: [],
    objetivos: [],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    await createProyecto(formData);
    onSuccess();
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6">Crear Proyecto</Typography>
      <TextField name="titulo" label="Título" fullWidth onChange={handleChange} />
      <TextField name="area" label="Área" fullWidth onChange={handleChange} />
      <TextField name="cronograma" label="Cronograma" fullWidth onChange={handleChange} />
      <TextField name="presupuesto" label="Presupuesto" type="number" fullWidth onChange={handleChange} />
      <TextField name="institucion" label="Institución" fullWidth onChange={handleChange} />
      <TextField name="docenteId" label="ID del Docente" fullWidth onChange={handleChange} />
      <TextField name="observaciones" label="Observaciones" fullWidth onChange={handleChange} />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Guardar Proyecto
      </Button>
    </Box>
  );
};

export default ProyectoForm;
