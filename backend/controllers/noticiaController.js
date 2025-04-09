const Noticia = require("../models/noticia");
const imgur = require("imgur");
const fs = require("fs");

// Crear nueva noticia
exports.crearNoticia = (req, res) => {
  if (!req.files || !req.files.fotoNoticia) {
    return res.status(400).json({ error: "No se ha subido ninguna imagen" });
  }

  let {fotoNoticia} = req.files;
  const mimetype = fotoNoticia.mimetype;
  const size = fotoNoticia.size;

  // Validar tamaño de archivo max 10MB (10000000 - 10 millones bytes)
  if (size > 10000000) {
    return res.status(400).json({
      error: "La imagen es demasiado grande. Máximo 10MB",
    });
  }
  
  // Validar tipo de archivo
  if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
    return res.status(400).json({
      error: "Formato de imagen no válido. Solo se permiten JPG y PNG",
    });
  }

  let uploadPath = __dirname + "/uploads/" + fotoNoticia.name;

  fotoNoticia.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    imgur.uploadFile(uploadPath).then((urlObject) => {
      fs.unlinkSync(uploadPath);
      const idFotoNoticia = urlObject.id;

      const nuevaNoticia = new Noticia(
        req.body.titulo,
        req.body.contenido,
        req.body.autor_id,
        idFotoNoticia
      );

      Noticia.crear(nuevaNoticia, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
          mensaje: "Noticia creada exitosamente",
          id: resultado.insertId,
        });
      });
    });
  });
};

// Obtener todas las noticias
exports.obtenerNoticias = (req, res) => {
  Noticia.obtenerTodos((err, noticias) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(noticias);
  });
};

// Obtener todas las noticias de un autor
exports.obtenerNoticiasPorAutor = (req, res) => {
  Noticia.obtenerNoticiasPorAutor(req.params.id, (err, noticias) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(noticias);
  });
};

// Obtener una noticia
exports.obtenerUnaNoticia = (req, res) => {
  Noticia.obtenerUnaNoticia(req.params.id, (err, noticia) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(noticia);
  });
};

// Editar noticia
exports.editarNoticia = (req, res) => {
  const noticiaActualizada = new Noticia(
    req.body.titulo,
    req.body.contenido,
    req.body.autor_id
  );
  Noticia.editar(req.params.id, noticiaActualizada, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Noticia actualizada exitosamente" });
  });
};

// Eliminar noticia
exports.eliminarNoticia = (req, res) => {
  Noticia.eliminar(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Noticia eliminada exitosamente" });
  });
};
