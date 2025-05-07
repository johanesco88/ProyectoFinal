import reactLogo from './assets/react.svg'
import { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';


import ProyectoList from './components/ProyectoList';
import ProyectoForm from './components/ProyectoForm';
import ProyectoDetalle from './components/ProyectoDetalle';
// import { getProyectos, createProyecto,updateProyecto, deleteProyecto, getUsuarios } from './services/api';
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from './services/api';

import './App.css'


function App() {
  // const [proyectos, setProyectos] = useState([]);
  // const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  // const [editId, setEditId] = useState(null);

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {

    fetchUsuarios();
  }, []);

  // const fetchProyectos = async () => {
  //   const res = await getProyectos();
  //   setProyectos(res.data);
  // };
  const fetchUsuarios = async () => {
    const res = await getUsuarios();
    setUsuarios(res.data);
  };


  // crud usuarios
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    identificacion: '',
    correo: '',
    contraseña: '',
    rol: '',
    institucion: '',
    grado: ''
  });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await getUsuarios();
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await updateUsuario(editandoId, form);
      } else {
        await createUsuario(form);
      }
      setForm({
        nombres: '',
        apellidos: '',
        identificacion: '',
        correo: '',
        contraseña: '',
        rol: '',
        institucion: '',
        grado: ''
      });
      setEditandoId(null);
      cargarUsuarios();
    } catch (error) {
      console.error('Error al guardar usuario', error);
    }
  };

  const handleEdit = (usuario) => {
    setForm(usuario);
    setEditandoId(usuario._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      cargarUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  };

  //proyectos
  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <div>
        {/* <h1>📚 Proyectos Escolares</h1>  mostar usuarops y proyectos
        <ul>
          {proyectos.map((p) => (
            <li key={p._id}>
              <strong>{p.titulo}</strong> - {p.area}  - {p.estado_actual} -{p.observaciones} -{ }
            </li>
          ))}
        </ul> */}
        <h2>👥 Usuarios Registrados</h2>
        <ul className="usuarios-lista"> {/* Añade la clase al <ul> */}
          {usuarios.map((u) => (
            <li key={u._id}>
              <p><strong>Nombre:</strong> {u.nombres} {u.apellidos}</p>
              <p><strong>Rol:</strong> {u.rol}</p>
              <p><strong>Identificación:</strong> {u.identificacion}</p>
              <p><strong>Grado:</strong> {u.grado}</p>
              <p><strong>Institución:</strong> {u.institucion}</p>
            </li>
          ))}
        </ul>
      </div>


      <div>
        <h2>Gestión de Usuarios</h2>
        <form onSubmit={handleSubmit}>
          <input name="nombres" placeholder="Nombres" value={form.nombres} onChange={handleChange} />
          <input name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} />
          <input name="identificacion" placeholder="Identificación" value={form.identificacion} onChange={handleChange} />
          <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
          <input type="password" name="contraseña" placeholder="Contraseña" value={form.contraseña} onChange={handleChange} />
          <input name="institucion" placeholder="Institución" value={form.institucion} onChange={handleChange} />
          <input name="grado" placeholder="Grado" value={form.grado} onChange={handleChange} />
          <select name="rol" value={form.rol} onChange={handleChange}>
            <option value="">Selecciona un rol</option>
            <option value="coordinador">Coordinador</option>
            <option value="docente">Docente</option>
            <option value="estudiante">Estudiante</option>
          </select>
          <button type="submit">{editandoId ? 'Actualizar' : 'Crear'}</button>
        </form>

        <h3>Lista de usuarios</h3>
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario._id}>
              {usuario.nombres} {usuario.apellidos} - {usuario.correo} ({usuario.rol})
              <button onClick={() => handleEdit(usuario)}>Editar</button>
              <button onClick={() => handleDelete(usuario._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>


{/* 
      <ProyectoList />
      <ProyectoForm />

      <ProyectoDetalle /> */}

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ProyectoForm onSuccess={() => setRefresh(!refresh)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ProyectoList onSelect={setSelectedId} key={refresh} />
          </Grid>
          <Grid item xs={12} md={4}>
            {selectedId && <ProyectoDetalle proyectoId={selectedId} />}
          </Grid>
        </Grid>
      </Container>


    </>
  )
}

export default App
