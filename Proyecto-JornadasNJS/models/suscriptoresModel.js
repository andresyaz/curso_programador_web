var pool = require('./bd');

/* OPERACIONES CRUD de tabla SUSCRIPTORES */

// LISTAR SUSCRIPTOR 
async function getSuscriptores() {
    var query = 'select * from suscriptores order by idSuscriptor desc';
    var rows = await pool.query(query);
    return rows;
}
// BORRAR SUSCRIPTOR
async function deleteSuscriptorById(idSuscriptor) {
    var query = 'delete from suscriptores where idSuscriptor = ? ';
    var rows = await pool.query(query, [idSuscriptor]);
    return rows;
}

// INSERTAR SUSCRIPTOR
async function insertarSuscriptor(obj) {
    try {
        var query = 'insert into suscriptores set ?'; //recibe un array
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error)
    }
}

// MODIFICAR SUSCRIPTOR
//obtener sucriptor
async function getSuscriptorById(id) {
    
        var query = 'select * from suscriptores where idSuscriptor= ?'; 
        var rows = await pool.query(query, [idSuscriptor]);
        return rows[0];
    
}
//modificarlo
async function modificarSuscriptorById(obj, idSuscriptor) {
    try {
        var query = 'update suscriptores set ? where id = ?'; 
        var rows = await pool.query(query, [obj], idSuscriptor);
        return rows;
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getSuscriptores, deleteSuscriptorById, insertarSuscriptor, getSuscriptorById, modificarSuscriptorById }