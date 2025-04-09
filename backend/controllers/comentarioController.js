const Comentario = require('../models/comentario');

// Crear nuevo comentario
exports.crearComentario = (req, res) => {
    const nuevoComentario = new Comentario(req.body.autor_id, req.body.contenido, req.body.noticia_id);
    Comentario.crear(nuevoComentario, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Comentario creado exitosamente', id: resultado.insertId });
    });
};

// Obtener todos los comentarios
exports.obtenerComentarios = (req, res) => {
    Comentario.obtenerTodos((err, comentarios) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(comentarios);
    });
};

// Obtener todos los comentarios de una noticia
exports.obtenerComentariosPorNoticia = (req, res) => {
    Comentario.obtenerComentariosPorNoticia(req.params.id, (err, comentarios) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(comentarios);
    });
};

// Editar comentario
exports.editarComentario = (req, res) => {
    const comentarioActualizado = new Comentario(req.body.autor, req.body.contenido, req.body.fecha_publicacion, req.body.noticia_id);
    Comentario.editar(req.params.id, comentarioActualizado, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Comentario actualizado exitosamente' });
    });
};

// Eliminar comentario
exports.eliminarComentario = (req, res) => {
    Comentario.eliminar(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Comentario eliminado exitosamente' });
    });
};
