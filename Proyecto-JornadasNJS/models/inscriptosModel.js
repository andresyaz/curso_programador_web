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
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

 

module.exports = { getInscriptos, insertarInscripto }