const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path"); // Para manejar rutas de archivos estáticos
const cors = require("cors"); // Middleware para habilitar CORS
const fileUpload = require('express-fileupload')
const routes = require("./routes/routes"); // Rutas de la API

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 } })) // 10MB
const PORT = process.env.PORT || 3001;

// Middleware para habilitar CORS (permitir solicitudes desde otros orígenes)
app.use(cors()); // Permite todas las solicitudes de cualquier origen

// Middleware para parsear el cuerpo de las solicitudes en JSON y URL encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de la API
app.use("/api", routes);


// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error en el servidor" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
