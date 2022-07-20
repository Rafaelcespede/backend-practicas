import { pool } from '../database'

export const getTutor = async (req,res)=>{
    try {
        const response = await pool.query('select * from tutores');
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json('Error al listar tutores')
    }
};
export const postTutor = async (req, res) =>{
    try {
        const {especialidad, idpersona, estado} = req.body;
        await pool.query('INSERT INTO tutores (especialidad,idpersona, estado) VALUES ($1,$2,$3)',[especialidad, idpersona, estado]);
        return res.status(200).json({
            message: 'Tutor registrado correctamente'
        });
    } catch (error) {
        return res.status(500).json('Error al registrar Alumno '+error.message);
    }
};
export const updateTutor = async (req, res) =>{
    try {
        const id =parseInt(req.params.id);
        const {especialidad, idpersona, estado} = req.body;
        await pool.query('update tutores set especialidad=$1, idpersona =$2, estado =$3 where idtutor =$4',[especialidad, idpersona, estado]);
        return res.status(200).json({
            message: 'Tutor modificado correctamente'
        });
    } catch (error) {
        return res.status(500).json('Error al editar tutor '+error.message);
    }
};

