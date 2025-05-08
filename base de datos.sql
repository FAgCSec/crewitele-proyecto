
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `categoria_noticias` (
  `noticia_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `comentario` (
  `id` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `autor_id` int(11) DEFAULT NULL,
  `noticia_id` int(11) DEFAULT NULL,
  `fecha_publicacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `noticia` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `autor_id` int(11) DEFAULT NULL,
  `fecha_publicacion` datetime DEFAULT current_timestamp(),
  `id_foto_noticia` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `foto_perfil` longblob DEFAULT NULL,
  `rol_id` int(11) NOT NULL DEFAULT 2,
  `ruta_foto_perfil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);


ALTER TABLE `categoria_noticias`
  ADD PRIMARY KEY (`noticia_id`,`categoria_id`),
  ADD KEY `categoria_id` (`categoria_id`);


ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor_id` (`autor_id`),
  ADD KEY `noticia_id` (`noticia_id`);


ALTER TABLE `noticia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor_id` (`autor_id`);


ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);


ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `fk_rol_id` (`rol_id`);


ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;


ALTER TABLE `noticia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;


ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;


ALTER TABLE `categoria_noticias`
  ADD CONSTRAINT `categoria_noticias_ibfk_1` FOREIGN KEY (`noticia_id`) REFERENCES `noticia` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `categoria_noticias_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON DELETE CASCADE;


ALTER TABLE `comentario`
  ADD CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`noticia_id`) REFERENCES `noticia` (`id`) ON DELETE CASCADE;


ALTER TABLE `noticia`
  ADD CONSTRAINT `noticia_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `usuario` (`id`) ON DELETE SET NULL;


ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;





INSERT INTO `rol` (`id`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Usuario');


