const mysql = require("mysql2");
const dotenv = require('dotenv');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "agudelo",
  password: "12345678",
  database: "noticias",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;
