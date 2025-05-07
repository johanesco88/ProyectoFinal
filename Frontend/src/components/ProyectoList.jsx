import React, { useEffect, useState } from 'react';
import { getProyectos } from '../services/api';
import { Button, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const ProyectoList = ({ onSelect }) => {
  const [proyectos, setProyectos] = useState([]);

  const fetchData = async () => {
    const res = await getProyectos();
    setProyectos(res.data);
  };

  const handleDelete = async (id) => {
    await deleteProyecto(id);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Listado de Proyectos</Typography>
      <List>
        {proyectos.map((proyecto) => (
          <ListItem key={proyecto._id} divider>
            <ListItemText
              primary={proyecto.titulo}
              secondary={`Área: ${proyecto.area} - Estado: ${proyecto.estado_actual}`}
              onClick={() => onSelect(proyecto._id)}
              style={{ cursor: 'pointer' }}
            />
            <Button color="error" onClick={() => handleDelete(proyecto._id)}>
              Eliminar
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProyectoList;
