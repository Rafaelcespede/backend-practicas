import { pool } from '../database'

export const getAlumno = async (req,res)=>{
    try {
        const response = await pool.query('select * from alumnos');
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json('Error al listar alumnos')
    }
};
export const postAlumno = async (req, res) =>{
    try {
        const {escuela, idpersona,estado} = req.body;
        await pool.query('INSERT INTO alumnos (escuela,idpersona, estado) VALUES ($1,$2,$3);',[escuela, idpersona,estado]);
        return res.status(200).json({
            message: 'Alumno registrado correctamente'
        });
    } catch (error) {
        return res.status(500).json('Error al registrar alumno '+error.message);
    }
};
export const updateAlumno = async (req, res) =>{
    try {
        const id =parseInt(req.params.id);
        const {escuela, idpersona,estado} = req.body;
        await pool.query('update alumnos set escuela=$1, idpersona =$2, estado =$3 where idpersona =$4',[escuela, idpersona,estado,id]);
        return res.status(200).json({
            message: 'Alumno modificado correctamente'
        });
    } catch (error) {
        return res.status(500).json('Error al editar Alumno '+error.message);
    }
};
/* export const deleteAlumno = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('delete from alumnos where idalumno  = $1', [id]);
        return res.status(200).json({
            message: 'Alumno eliminado correctamente...!'
        });
    } catch (e) {
        return res.status(500).json('Error al eliminar el alumno');
    }
}; */
