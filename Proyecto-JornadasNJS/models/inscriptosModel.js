var pool = require('./bd');

/* OPERACIONES CRUD de tabla INSCRIPTOS */

async function getInscriptos() {
    var query = 'select * from inscriptos order by idInscripto desc';
    var rows = await pool.query(query);
    return rows;
}

// INSERTAR inscripto 
async function insertarInscripto(obj) {
    try {
        var query = 'insert into inscriptos set ?'; //recibe un array
        obj.fecha = new Date(); // Agrega la fecha actual al objeto
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// BORRAR USUARIO
async function deleteInscriptoById(id) {
    var query = 'delete from inscriptos where idInscripto= ? ';
    var rows = await pool.query(query, [id]);
    return rows;
}


// MODIFICAR USUARIO
//obtener usuario
async function getInscriptoById(id) {

    var query = 'select * from usuarios where idInscripto= ?';
    var rows = await pool.query(query, [idInscripto]);
    return rows[0];

}
//modificarlo
async function modificarInscriptoById(obj, idInscripto) {
    try {
        var query = 'update inscriptos set ? where idInscripto= ?';
        var rows = await pool.query(query, [obj, idInscripto]);
        return rows;
    } catch (error) {
        throw (error)
    }
}



module.exports = { getInscriptos, insertarInscripto, deleteInscriptoById, getInscriptoById, modificarInscriptoById }