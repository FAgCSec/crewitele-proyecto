const db = require('../config/db');

// Define la clase Categoria
class Categoria {
    constructor(id, descripcion) {
        this.id = id;
        this.descripcion = descripcion; // nombre de la categoría, por ejemplo: tecnologia, informativo, videojuegos, etc.
    }

    // Crear nueva categoría
    static crear(categoria, callback) {
        const sql = 'INSERT INTO categorias (descripcion) VALUES (?)';
        db.query(sql, [categoria.descripcion], callback);
    }

    // Obtener todas las categorías
    static obtenerTodos(callback) {
        const sql = 'SELECT * FROM categoria';
        db.query(sql, callback);
    }

    // Editar una categoría existente
    static editar(id, categoriaActualizada, callback) {
        const sql = 'UPDATE categorias SET descripcion = ? WHERE id = ?';
        db.query(sql, [categoriaActualizada.descripcion, id], callback);
    }

    // Eliminar una categoría
    static eliminar(id, callback) {
        const sql = 'DELETE FROM categorias WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = Categoria;
