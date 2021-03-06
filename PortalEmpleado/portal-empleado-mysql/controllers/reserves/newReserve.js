'use strict';

const { getConnection } = require('../../db');
const {
  formatDateToDB,
  sendEmail,
  randomString,
  generateError
} = require('../../helpers');

const { reserveSchema } = require('../validations');

// POST - /RESERVES
async function newReserve(req, res, next) {
  let connection;

  try {
    await reserveSchema.validateAsync(req.body);

    const { reserveType, dateInit, dateEnd, commentary } = req.body;

    connection = await getConnection();

    const date = formatDateToDB(new Date());
    const dateReserve = formatDateToDB(new Date(dateInit));

    // check dateInit > Now
    if (dateReserve <= date) {
      throw generateError(
        'La fecha de la reserva no puede ser anterior a este momento'
      );
    }

    // Check type of reserve exists in the db
    const [
      dataTypeReserve
    ] = await connection.query(
      `SELECT id, tipo FROM servicios WHERE tipo LIKE ?`,
      [`%${reserveType}%`]
    );

    if (!dataTypeReserve.length) {
      throw generateError(
        'El tipo de reserva que indica no existe en la base de datos'
      );
    }
    const [dataReserve] = dataTypeReserve;

    // Check type of reserve exists for that headquarter
    const [
      existTypeReserveForHeadquarter
    ] = await connection.query(
      `SELECT * FROM sedes_servicios ss WHERE ss.sedes_id=? AND ss.servicios_id = (SELECT s.id FROM servicios s WHERE s.tipo like ?)`,
      [req.auth.headquarter, `%${reserveType}%`]
    );

    if (!existTypeReserveForHeadquarter.length) {
      throw generateError(
        'Por el momento,no es posible realizar esta reserva en tu sede de trabajo'
      );
    }

    // check number of reserves availabity in user`s headquarter
    const [
      dataDisponibilityReserve
    ] = await connection.query(
      `SELECT disponibilidad_servicios FROM sedes_servicios WHERE sedes_id= ? AND servicios_id=?`,
      [req.auth.headquarter, dataReserve.id]
    );

    const [reserveDisponibililty] = dataDisponibilityReserve;

    // Check number of reservations made

    const [dataReservesMade] = await connection.query(
      `SELECT count(id) AS numberOfReserves FROM reservas WHERE servicios_id= ?
       AND usuarios_id IN (SELECT id FROM usuarios WHERE sedes_id = ?)
        AND fecha_hora_inicio_reserva BETWEEN ? AND ?
       OR fecha_hora_fin_reserva BETWEEN ? AND ?
       ;`,
      [
        dataReserve.id,
        req.auth.headquarter,
        dateInit,
        dateEnd,
        dateInit,
        dateEnd
      ]
    );

    const [reservesMade] = dataReservesMade;

    if (
      reservesMade.numberOfReserves >=
      reserveDisponibililty.disponibilidad_servicios
    ) {
      throw generateError(
        'No es posible realizar la reserva, en estos momentos no hay disponibilidad'
      );
    }

    const [result] = await connection.query(
      `INSERT INTO reservas(servicios_id, usuarios_id, fecha_hora_inicio_reserva,fecha_hora_fin_reserva,
        motivo_reserva)
        VALUES(?,?, ?, ?, ?)`,
      [dataReserve.id, req.auth.id, dateInit, dateEnd, commentary]
    );
    // Send email with number of reserve

    const reserveCode =
      result.insertId +
      '-' +
      dataReserve.tipo.replace(/ /g, '').slice(0, 4) +
      '-' +
      randomString(10);

    const reserveCodeURL = `${process.env.PUBLIC_HOST}/reserves/code/${reserveCode}`;

    try {
      await sendEmail({
        email: req.auth.email,
        title: 'Registro de reserva en el Portal del Empleado',
        html: `<div>
              <h1>Reserva registrada</h1>
              <p>Hemos registrado tu reserva de ${
                dataReserve.tipo
              } con el código: <strong>${reserveCode}</strong> el día ${new Date(
          date
        ).toLocaleString('es-ES')}</p> </p>
              <p>Si deseas revisarla, haz click en el enlace: ${reserveCodeURL}, o copialo en tu navegador. También puedes revisarla en el apartado de reservas de tu Portal.</p>
              <br>           
              <p>Los datos de tu reserva son:</p>
              <p>Cógigo de Reserva: ${reserveCode}.</p>
              <p>Tipo de Reserva: ${dataReserve.tipo}.</p>
              <p>Fecha de Registro: ${new Date(date).toLocaleString(
                'es-ES'
              )}.</p>
                <p>Fecha de Inicio: ${new Date(dateInit).toLocaleString(
                  'es-ES'
                )}.</p>
              <p>Fecha de Fin: ${new Date(dateEnd).toLocaleString('es-ES')}.</p>
              <p>Motivo: ${commentary}.</p>
              <br>
              <p> <strong> Recuerda valorar la reserva una vez finalizada. </strong>  </p>
              <p>Muchas gracias.</p>

              </div>`
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error(
        'Error enviando mail de la reserva. Inténtalo de nuevo más tarde.'
      );
    }
    await connection.query(
      `
      UPDATE reservas SET codigo_reserva =? WHERE id=?
    `,
      [reserveCode, result.insertId]
    );

    res.send({
      status: 'ok',
      message: `Hemos registrado su reserva en el Portal del Empleado. Los datos de tu reserva son:`,
      data: {
        id: result.insertId,
        user: req.auth.id,
        Fecha: date,
        Tipo_de_reserva: dataReserve.tipo,
        Fecha_de_inicio: dateInit,
        Fecha_de_fin: dateEnd,
        Número_de_reserva: reserveCode,
        Descripción: commentary
      }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newReserve;
