import { pool } from '../database'

export const getCurso = async (req,res)=>{
    try {
        const response = await pool.query('select * from cursos');
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json('Error al listar personas')
    }
};
export const postCurso = async (req, res) =>{
    try {
        const {idtutor, idalumno, nombre, meses, fecha_inicio, fecha_fin, estado} = req.body;
        await pool.query('INSERT INTO cursos (idtutor, nombre, meses, fecha_inicio, fecha_fin) VALUES ($1,$2,$3,$4,$5);',[idtutor, nombre, meses, fecha_inicio, fecha_fin]);
        return res.status(200).json({
            message: 'Curso registrado correctamente'
        });
    } catch (error) {
        return res.status(500).json('Error al registrar Curso '+error.message);
    }
};
export const updateCurso = async (req, res) =>{
    try {
        const id =parseInt(req.params.id);
        const {idtutor, nombre, meses, fecha_inicio, fecha_fin, estado} = req.body;
        await pool.query('update cursos set idtutor=$1, nombre=$2, meses =$3, fecha_inicio =$4, fecha_fin =$5, estado =$6 where idpersona =$7',[idtutor, nombre, meses, fecha_inicio, fecha_fin, estado,id]);
        return res.status(200).json({
            message: 'Curso modificado correctamente'
        });
    } catch (error) {
        return res.status(500).json('Error al editar Curso '+error.message);
    }
};
export const deleteCurso = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('delete from cursos where idcurso  = $1', [id]);
        return res.status(200).json({
            message: 'Curso eliminado correctamente...!'
        });
    } catch (e) {
        return res.status(500).json('Error al eliminar el curso');
    }
};