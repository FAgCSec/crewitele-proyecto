// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.verificarToken);

module.exports = router;