'use strict';

require('dotenv').config();

const { getConnection } = require('../../db');

const { editUserSchema } = require('../validations');

const {
  processAndSavePhoto,
  deletePhoto,
  generateError
} = require('../../helpers');

// PUT - /USERS/:id  --- EDIT USER (ONLY USERS AND ADMIN)
async function editUser(req, res, next) {
  let connection;

  try {
    await editUserSchema.validateAsync(req.body);

    const { id } = req.params;
    const {
      name,
      surname,
      identification_document,
      email,
      address,
      postal_code,
      location,
      province,
      country,
      phone,
      birthdate,
      headquarters
    } = req.body;

    connection = await getConnection();

    //Check if headquarters exists

    const [
      result
    ] = await connection.query(
      `SELECT id, nombre FROM sedes WHERE nombre LIKE ?`,
      [`%${headquarters}%`]
    );

    if (!result.length) {
      throw generateError(
        'La Sede que indica no existe en la base de datos',
        404
      );
    }

    const [sede] = result;

    // Check if user exists

    const [current] = await connection.query(
      `
     SELECT id, fecha_registro, nombre, apellidos, num_doc_identidad, email,
      foto, direccion, codigo_postal, localidad, provincia, pais,
      telefono, fecha_nacimiento, sedes_id
      FROM usuarios WHERE id=?
    `,
      [id]
    );

    if (!current.length) {
      throw generateError(`El usuario con id ${id} no existe`, 404);
    }
    console.log(current[0].id);
    // Check if auth user is the same as :id or is admin
    if (current[0].id !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError('No tienes permisos para editar este usuario', 401);
    }

    // Check if there is a uploaded avatar and process it

    let savedFileName;

    if (req.files && req.files.avatar) {
      try {
        savedFileName = await processAndSavePhoto(req.files.avatar);

        if (current && current.avatar) {
          await deletePhoto(current.avatar);
        }
      } catch (error) {
        throw generateError(
          'No hemos podido procesar la carga de la imagen. Inténtalo de nuevo.',
          400
        );
      }
    } else {
      savedFileName = current.avatar;
    }

    // Update user

    await connection.query(
      `
      UPDATE usuarios SET nombre=?, apellidos=?, num_doc_identidad=?,
      email=?, foto=?, direccion=?, codigo_postal=?, localidad=?, provincia=?, 
      pais=?, telefono=?, fecha_nacimiento=?, sedes_id=? WHERE id=?
    `,
      [
        name,
        surname,
        identification_document,
        email,
        savedFileName,
        address,
        postal_code,
        location,
        province,
        country,
        phone,
        birthdate,
        sede.id,
        id
      ]
    );

    res.send({ status: 'ok', message: 'Usuario actualizado' });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  editUser
};