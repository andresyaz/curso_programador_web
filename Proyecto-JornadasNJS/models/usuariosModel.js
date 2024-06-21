var pool = require('./bd');
var md5 = require('md5');

// LOGIN
async function getUserAndPassword(user, password) {
    try {
        var query = 'select * from usuarios where user = ? and password = ? limit 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error)
    }
}
 

/* OPERACIONES CON USUARIOS */

// LISTAR USUSARIOS
async function getUsuarios() {
    var query = 'select * from usuarios order by id desc';
    var rows = await pool.query(query);
    return rows;
}
// BORRAR USUARIO
async function deleteUsuarioById(id) {
    var query = 'delete from usuarios where id = ? ';
    var rows = await pool.query(query, [id]);
    return rows;
}

// INSERTAR USUARIO
async function insertarUsuario(obj) {
    try {
        var query = 'insert into usuarios set ?'; //recibe un array
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error)
    }
}

// MODIFICAR USUARIO
//obtener usuario
async function getUsuarioById(id) {
    
        var query = 'select * from usuarios where id= ?'; 
        var rows = await pool.query(query, [id]);
        return rows[0];
    
}
//modificarlo
async function modificarUsuarioById(obj, id) {
    try {
        var query = 'update usuarios set ? where id = ?'; 
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
       throw(error)
    }
}


module.exports = { getUserAndPassword, getUsuarios, deleteUsuarioById, insertarUsuario, getUsuarioById, modificarUsuarioById }