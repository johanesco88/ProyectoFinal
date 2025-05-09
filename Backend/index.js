const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const proyectosRoutes = require('./routes/proyectos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const authRoutes = require('./routes/auth.routes');

const admin = require("firebase-admin");




app.use('/api/proyectos', proyectosRoutes);
app.use('/api/usuarios', usuariosRoutes);




// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    console.log('📂 Base de datos:', mongoose.connection.name);
    console.log('🗂️ Host / Cluster:', mongoose.connection.host);
  })
  .catch(err => console.error('❌ Error conectando a MongoDB Atlas:', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
