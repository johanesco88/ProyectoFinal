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
const avancesRoutes = require('./routes/avances.routes');

const admin = require("firebase-admin");

// const serviceAccount = require("./config/firebase.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


app.use('/api/proyectos', proyectosRoutes);
app.use('/api/usuarios', usuariosRoutes);
// app.use('/api/avances', avancesRoutes);




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
