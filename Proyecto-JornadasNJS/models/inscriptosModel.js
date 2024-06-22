const pool = require('./bd');

/* OPERACIONES CRUD de tabla INSCRIPTOS */

// Obtener todos los inscriptos
async function getInscriptos() {
    try {
        const query = 'SELECT * FROM inscriptos ORDER BY idInscripto DESC';
        const rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Insertar inscripto
async function insertarInscripto(obj) {
    try {
        const query = 'INSERT INTO inscriptos SET ?'; // Recibe un objeto
        obj.fecha = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formatear la fecha adecuadamente
        const rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Borrar inscripto por ID
async function deleteInscriptoById(id) {
    try {
        const query = 'DELETE FROM inscriptos WHERE idInscripto = ?';
        const rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Obtener inscripto por ID
async function getInscriptoById(id) {
    try {
        const query = 'SELECT * FROM inscriptos WHERE idInscripto = ?';
        const rows = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Modificar inscripto por ID
async function modificarInscriptoById(obj, idInscripto) {
    try {
        const query = 'UPDATE inscriptos SET ? WHERE idInscripto = ?';
        const rows = await pool.query(query, [obj, idInscripto]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { getInscriptos, insertarInscripto, deleteInscriptoById, getInscriptoById, modificarInscriptoById };
