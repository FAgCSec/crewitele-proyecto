const CategoriaNoticia = require('../models/categoriaNoticia');

// Asociar una categoría a una noticia
exports.asociarCategoriaNoticia = (req, res) => {
    const { noticia_id, categoria_id } = req.body;
    CategoriaNoticia.asociar(noticia_id, categoria_id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Categoría asociada a la noticia exitosamente' });
    });
};

// Obtener categorías asociadas a una noticia
exports.obtenerCategoriasPorNoticia = (req, res) => {
    const { noticia_id } = req.params;
    CategoriaNoticia.obtenerPorNoticia(noticia_id, (err, categorias) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(categorias);
    });
};

// Obtener noticias asociadas a una categoría
exports.obtenerNoticiasPorCategoria = (req, res) => {
    const { categoria_id } = req.params;
    CategoriaNoticia.obtenerPorCategoria(categoria_id, (err, noticias) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(noticias);
    });
};

// Eliminar asociación entre categoría y noticia
exports.eliminarAsociacionCategoriaNoticia = (req, res) => {
    const { noticia_id, categoria_id } = req.body;
    CategoriaNoticia.eliminar(noticia_id, categoria_id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Asociación eliminada exitosamente' });
    });
};
