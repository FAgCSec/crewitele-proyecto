const mysql = require("mysql2");
const dotenv = require('dotenv');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10),
  queueLimit: 0,
});

module.exports = db;

