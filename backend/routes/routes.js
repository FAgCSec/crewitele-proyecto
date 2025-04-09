const express = require('express');
const router = express.Router();

// Importar controladores
const noticiaController = require('../controllers/noticiaController'); // Noticias
const categoriaController = require('../controllers/categoriaController'); // Categorías
const comentarioController = require('../controllers/comentarioController'); // Comentarios
const usuarioController = require('../controllers/usuarioController'); // Usuarios
const rolController = require('../controllers/rolController'); // Roles
const categoriaNoticiaController = require('../controllers/categoriaNoticiaController'); // Relaciones Categorías y Noticias
const descargarArchivosController = require('../controllers/descargarArchivosController.js'); // Relaciones Usuarios y Roles
const authController = require('../controllers/authController.js');

// **Usuarios**
router.post('/usuarios/', usuarioController.crearUsuario); // Ruta para crear un nuevo usuario (Registro)
router.post('/usuarios/:id/foto', usuarioController.subirFotoPerfil); // Ruta para subir foto de perfil

router.get('/usuarios/:id/foto', usuarioController.obtenerFotoPerfil); // Ruta para obtener la foto de perfil desencriptada
router.get('/usuarios/', usuarioController.obtenerUsuarios); // Obtener usuarios
router.get('/usuarios/:id', usuarioController.obtenerUnUsuario); // Obtener un usuario por su id

router.put('/usuarios/:id', usuarioController.editarUsuario); // Editar usuario
router.delete('/usuarios/:id', usuarioController.eliminarUsuario); // Eliminar usuario
router.delete('/usuarios/:id/foto', usuarioController.eliminarFotoPerfil); // Eliminar foto de perfil de un usuario

// **Noticias**
router.post('/noticias', noticiaController.crearNoticia); // Crear noticia
router.get('/noticias', noticiaController.obtenerNoticias); // Obtener todas las noticias
router.get('/noticias/autor/:id', noticiaController.obtenerNoticiasPorAutor); // Obtener todas las noticias de un autor
router.get('/noticias/:id', noticiaController.obtenerUnaNoticia); // Obtener una noticia
router.put('/noticias/:id', noticiaController.editarNoticia); // Editar noticia
router.delete('/noticias/:id', noticiaController.eliminarNoticia); // Eliminar noticia

// **Categorías**
router.post('/categorias', categoriaController.crearCategoria); // Crear categoría
router.get('/categorias', categoriaController.obtenerCategorias); // Obtener todas las categorías
router.put('/categorias/:id', categoriaController.editarCategoria); // Editar categoría
router.delete('/categorias/:id', categoriaController.eliminarCategoria); // Eliminar categoría

// **Comentarios**
router.post('/comentarios', comentarioController.crearComentario); // Crear comentario
router.get('/comentarios', comentarioController.obtenerComentarios); // Obtener comentarios
router.get('/comentarios/:id', comentarioController.obtenerComentariosPorNoticia); // Obtener un comentario
router.put('/comentarios/:id', comentarioController.editarComentario); // Editar comentario
router.delete('/comentarios/:id', comentarioController.eliminarComentario); // Eliminar comentario

// **Roles**
router.post('/rol', rolController.crearRol); // Crear rol
router.get('/rol', rolController.obtenerRoles); // Obtener roles
router.put('/rol/:id', rolController.editarRol); // Editar rol
router.delete('/rol/:id', rolController.eliminarRol); // Eliminar rol

// **Relaciones de Categorías y Noticias**
router.post('/categoria-noticia', categoriaNoticiaController.asociarCategoriaNoticia); // Asociar categoría con noticia
router.get('/categoria-noticia/noticia/:noticia_id', categoriaNoticiaController.obtenerCategoriasPorNoticia); // Obtener categorías por noticia
router.get('/categoria-noticia/categoria/:categoria_id', categoriaNoticiaController.obtenerNoticiasPorCategoria); // Obtener noticias por categoría
router.delete('/categoria-noticia', categoriaNoticiaController.eliminarAsociacionCategoriaNoticia); // Eliminar asociación

// Rutas de autenticación
router.post('/auth', authController.verificarToken)

// Login de usuario
router.post('/login', usuarioController.loginUsuario);

// Login de usuario con google
router.post('/login/google', usuarioController.loginUsuarioCorreo);

// Descargar Base de Datos en Formato SQL
router.get('/descargar-db', descargarArchivosController.descargarDb)

// Descargar Noticias de la Base de Datos en Formato PDF
router.get('/descargar-pdf/:id', descargarArchivosController.descargarPdf)

// Descargar Noticias de la Base de Datos en Formato Excel
router.get('/descargar-excel/:id', descargarArchivosController.descargarExcel)

module.exports = router;
