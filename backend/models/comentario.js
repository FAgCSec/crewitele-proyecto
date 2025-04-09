const db = require('../config/db');

// Define la clase Comentario
class Comentario {
    constructor(autor_id, contenido, noticia_id) {
        this.autor_id = autor_id;
        this.contenido = contenido;
        this.noticia_id = noticia_id;
    }

    // Crear nuevo comentario
    static crear(comentario, callback) {
        const sql = 'INSERT INTO comentario (autor_id, contenido, noticia_id) VALUES (?, ?, ?)';
        db.query(sql, [comentario.autor_id, comentario.contenido, comentario.noticia_id], callback);
    }

    // Obtener todos los comentarios
    static obtenerTodos(callback) {
        const sql = 'SELECT * FROM comentario';
        db.query(sql, callback);
    }

    // Obtener todos los comentarios de una noticia
    static obtenerComentariosPorNoticia(id, callback) {
        const sql = 'SELECT c.*, u.nombre_usuario FROM comentario AS c JOIN usuario AS u ON c.autor_id = u.id WHERE noticia_id = ?;';
        db.query(sql, [id], callback);
    }

    // Editar un comentario existente
    static editar(id, comentarioActualizado, callback) {
        const sql = 'UPDATE comentarios SET autor = ?, contenido = ?, fecha_publicacion = ?, noticia_id = ? WHERE id = ?';
        db.query(sql, [comentarioActualizado.autor, comentarioActualizado.contenido, comentarioActualizado.fecha_publicacion, comentarioActualizado.noticia_id, id], callback);
    }

    // Eliminar un comentario
    static eliminar(id, callback) {
        const sql = 'DELETE FROM comentarios WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = Comentario;
