CREATE DATABASE portal_empleado;

USE portal_empleado;

CREATE TABLE sedes(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
activo BOOLEAN NOT NULL DEFAULT TRUE,
nombre VARCHAR(255) NOT NULL,
direccion VARCHAR(255) NOT NULL,
codigo_postal VARCHAR(10) NOT NULL,
localidad VARCHAR(50) NOT NULL,
provincia VARCHAR(50) NOT NULL,
pais VARCHAR(50) NOT NULL,
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
);

CREATE TABLE usuarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
tipo_usuario VARCHAR(100) NOT NULL,
activo BOOLEAN NOT NULL DEFAULT TRUE,
nombre VARCHAR(255) NOT NULL,
apellidos VARCHAR(255) NOT NULL,
num_doc_identidad VARCHAR(15) NOT NULL UNIQUE,
email VARCHAR(200) NOT NULL UNIQUE,
contraseña VARCHAR(50) NOT NULL,
foto VARCHAR(255) DEFAULT NULL,
direccion VARCHAR(255) NOT NULL,
codigo_postal VARCHAR(10) NOT NULL,
localidad VARCHAR(50) NOT NULL,
provincia VARCHAR(50) NOT NULL,
pais VARCHAR(50) NOT NULL,
telefono VARCHAR(20) NOT NULL,
fecha_nacimiento DATE DEFAULT NULL,
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
sedes_id INT UNSIGNED NOT NULL,
CONSTRAINT fk_usuarios_sedes FOREIGN KEY (sedes_id) REFERENCES sedes(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE servicios (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
activo BOOLEAN NOT NULL DEFAULT TRUE, 
seccion VARCHAR(50) NOT NULL,		-- 'reserva' , 'incidencia'
tipo VARCHAR(50) NOT NULL,   		-- 'vehículo','sala_reunión','comedor','informática','mantenimiento','limpieza','seguridad','otra'
descripcion VARCHAR(500),
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
);

CREATE TABLE sedes_servicios (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
sedes_id INT UNSIGNED NOT NULL,
servicios_id INT UNSIGNED NOT NULL,
diponibilidad_servicios INT UNSIGNED,
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
CONSTRAINT fk_sedes_servicios_sedes_id FOREIGN KEY (sedes_id) REFERENCES sedes(id) ON DELETE RESTRICT ON UPDATE CASCADE,
CONSTRAINT fk_sedes_servicios_servicios_id FOREIGN KEY (servicios_id) REFERENCES servicios(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE reservas(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
servicios_id INT UNSIGNED NOT NULL,
usuarios_id INT UNSIGNED NOT NULL,
fecha_reserva DATE NOT NULL,
hora_reserva TIME NOT NULL,
motivo_reserva TEXT NOT NULL,
duracion_reserva TIME NOT NULL,
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT fk_reservas_servicios FOREIGN KEY (servicios_id) REFERENCES servicios(id) ON DELETE RESTRICT ON UPDATE CASCADE,
CONSTRAINT fk_reservas_usuarios FOREIGN KEY (usuarios_id) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE incidencias (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
servicios_id INT UNSIGNED NOT NULL,
usuarios_id INT UNSIGNED NOT NULL,
descripcion VARCHAR(500) NOT NULL,
activo BOOLEAN NOT NULL DEFAULT TRUE,
fecha_resolucion DATETIME DEFAULT NULL,
comentario_resolucion VARCHAR(500) DEFAULT NULL,
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
CONSTRAINT fk_incidencias_servicios FOREIGN KEY (servicios_id) REFERENCES servicios(id) ON DELETE RESTRICT ON UPDATE CASCADE,
CONSTRAINT fk_incidencias_usuarios FOREIGN KEY (usuarios_id) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE valoraciones(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
usuarios_id INT UNSIGNED NOT NULL,
servicios_id INT UNSIGNED NOT NULL,
valoracion ENUM('1','2','3','4','5') NOT NULL,
comentario_valoracion VARCHAR(500),
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
CONSTRAINT fk_valoraciones_usuarios FOREIGN KEY (usuarios_id) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE,
CONSTRAINT fk_valoraciones_servicios FOREIGN KEY (servicios_id) REFERENCES servicios(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
