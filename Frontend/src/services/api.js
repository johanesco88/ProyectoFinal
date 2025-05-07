import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api' // Asegúrate de que coincide con tu backend
});

// export const getProyectos = () => API.get('/proyectos');
// export const createProyecto = (data) => API.post('/proyectos', data);
// export const updateProyecto = (id, data) => API.put(`/proyectos/${id}`, data);
// export const deleteProyecto = (id) => API.delete(`/proyectos/${id}`);


// Usuarios
export const getUsuarios = () => API.get('/usuarios');
export const createUsuario = (data) => API.post('/usuarios', data);
export const updateUsuario = (id, data) => API.put(`/usuarios/${id}`, data);
export const deleteUsuario = (id) => API.delete(`/usuarios/${id}`);



//proyectos
export const getProyectos = () =>API.get('/proyectos');
export const getProyectoById = (id) => API.get(`/proyectos/${id}`);
export const createProyecto = (data) => API.post('/proyectos', data);
export const updateProyecto = (id, data) => API.put(`/proyectos/${id}`, data);
export const deleteProyecto = (id) => API.delete(`/proyectos/${id}`);
export const addAvance = (id, objetivoIndex, avance) =>
  API.post(`/proyectos/${id}/objetivos/${objetivoIndex}/avances`, avance);
export const cambiarEstado = (id, data) =>
  API.post(`/proyectos/${id}/estado`, data);
export const buscarProyectos = (query) =>
  API.get(`/proyectos/buscar`, { params: query });











// // Avances
// export const getAvances = () => API.get('/avances');
// export const createAvance = (data) => API.post('/avances', data);
// export const updateAvance = (id, data) => API.put(`/avances/${id}`, data);
// export const deleteAvance = (id) => API.delete(`/avances/${id}`);