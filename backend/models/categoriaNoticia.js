const db = require('../config/db');

// Define la clase CategoriaNoticias
class CategoriaNoticias {
    constructor(noticia_id, categoria_id) {
        this.noticia_id = noticia_id;
        this.categoria_id = categoria_id;
    }

    // Asociar una categoría a una noticia
    static asociar(noticia_id, categoria_id, callback) {
        const sql = 'INSERT INTO categoria_noticias (noticia_id, categoria_id) VALUES (?, ?)';
        db.query(sql, [noticia_id, categoria_id], callback);
    }

    // Obtener las categorías asociadas a una noticia
    static obtenerPorNoticia(noticia_id, callback) {
        const sql = `
            SELECT c.* FROM categoria_noticias cn
            JOIN categoria c ON cn.categoria_id = c.id
            WHERE cn.noticia_id = ?
        `;
        db.query(sql, [noticia_id], callback);
    }

    // Obtener las noticias asociadas a una categoría
    static obtenerPorCategoria(categoria_id, callback) {
        const sql = `
            SELECT n.* FROM categoria_noticias cn
            JOIN noticia n ON cn.noticia_id = n.id
            WHERE cn.categoria_id = ?
        `;
        db.query(sql, [categoria_id], callback);
    }

    // Eliminar una asociación
    static eliminar(noticia_id, categoria_id, callback) {
        const sql = 'DELETE FROM categoria_noticias WHERE noticia_id = ? AND categoria_id = ?';
        db.query(sql, [noticia_id, categoria_id], callback);
    }
}

module.exports = CategoriaNoticias;
