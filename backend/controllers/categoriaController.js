const Categoria = require('../models/categoria');

// Crear nueva categoría
exports.crearCategoria = (req, res) => {
    const nuevaCategoria = new Categoria(null, req.body.nombre);
    Categoria.crear(nuevaCategoria, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Categoría creada exitosamente', id: resultado.insertId });
    });
};

// Obtener todas las categorías
exports.obtenerCategorias = (req, res) => {
    Categoria.obtenerTodos((err, categorias) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(categorias);
    });
};

// Editar categoría
exports.editarCategoria = (req, res) => {
    const categoriaActualizada = new Categoria(null, req.body.nombre);
    Categoria.editar(req.params.id, categoriaActualizada, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Categoría actualizada exitosamente' });
    });
};

// Eliminar categoría
exports.eliminarCategoria = (req, res) => {
    Categoria.eliminar(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Categoría eliminada exitosamente' });
    });
};
