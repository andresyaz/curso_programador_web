const pool = require('./bd');

/* OPERACIONES CRUD de tabla SUSCRIPTORES */

// LISTAR SUSCRIPTORES
async function getSuscriptores() {
    try {
        const query = 'SELECT * FROM suscriptores ORDER BY idSuscriptor DESC';
        const rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// BORRAR SUSCRIPTOR
async function deleteSuscriptorById(idSuscriptor) {
    try {
        const query = 'DELETE FROM suscriptores WHERE idSuscriptor = ?';
        const rows = await pool.query(query, [idSuscriptor]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// INSERTAR SUSCRIPTOR
async function insertarSuscriptor(obj) {
    try {
        const query = 'INSERT INTO suscriptores SET ?'; // Recibe un objeto
        const rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// OBTENER SUSCRIPTOR POR ID
async function getSuscriptorById(idSuscriptor) {
    try {
        const query = 'SELECT * FROM suscriptores WHERE idSuscriptor = ?';
        const rows = await pool.query(query, [idSuscriptor]);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// MODIFICAR SUSCRIPTOR POR ID
async function modificarSuscriptorById(obj, idSuscriptor) {
    try {
        const query = 'UPDATE suscriptores SET ? WHERE idSuscriptor = ?';
        const rows = await pool.query(query, [obj, idSuscriptor]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    getSuscriptores,
    deleteSuscriptorById,
    insertarSuscriptor,
    getSuscriptorById,
    modificarSuscriptorById
};
