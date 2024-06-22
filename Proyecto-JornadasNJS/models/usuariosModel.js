const pool = require('./bd');
const md5 = require('md5');

// LOGIN
async function getUserAndPassword(user, password) {
    try {
        const query = 'SELECT * FROM usuarios WHERE user = ? AND password = ? LIMIT 1';
        const rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw error; // Lanzar el error para manejarlo en el lugar donde se llame a la función
    }
}

/* OPERACIONES CON USUARIOS */

// LISTAR USUSARIOS
async function getUsuarios() {
    try {
        const query = 'SELECT * FROM usuarios ORDER BY id DESC';
        const rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// BORRAR USUARIO
async function deleteUsuarioById(id) {
    try {
        const query = 'DELETE FROM usuarios WHERE id = ?';
        const rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// INSERTAR USUARIO
async function insertarUsuario(obj) {
    try {
        const query = 'INSERT INTO usuarios (user, password, level) VALUES (?, ?, ?)';
        const rows = await pool.query(query, [obj.user, md5(obj.password), obj.level]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// MODIFICAR USUARIO
// Obtener usuario
async function getUsuarioById(id) {
    try {
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        const rows = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Modificar usuario
async function modificarUsuarioById(obj, id) {
    try {
        // Desestructura el objeto para obtener user y password
        const { user, password } = obj;
        // Define la consulta de actualización
        const query = 'UPDATE usuarios SET user = ?, password = ? WHERE id = ?';
        // Ejecuta la consulta con los valores correspondientes
        const rows = await pool.query(query, [user, md5(password), id]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    getUserAndPassword,
    getUsuarios,
    deleteUsuarioById,
    insertarUsuario,
    getUsuarioById,
    modificarUsuarioById
};
