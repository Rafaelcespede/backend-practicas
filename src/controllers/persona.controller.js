import { pool } from '../database'

export const getPersona = async (req,res)=>{
    try {
        const response = await pool.query('select * from personas');
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json('Error al listar personas')
    }
};
export const postPersona = async (req, res) =>{
    try {
        const {apellidos, nombres, direccion, telefono,estado} = req.body;
        await pool.query('INSERT INTO personas (apellidos, nombres, direccion, telefono, estado) VALUES ($1,$2,$3,$4,$5);',[apellidos, nombres, direccion, telefono,estado]);
        return res.status(200).json({
            message: 'Persona registrado correctamente'
        });
    } catch (error) {
        return res.status(500).json('Error al registrar Persona '+error.message);
    }
};
export const updatePersona = async (req, res) =>{
    try {
        const id =parseInt(req.params.id);
        const {apellidos, nombres, direccion, telefono,estado} = req.body;
        await pool.query('update personas set apellidos=$1, nombres =$2, direccion=$3, telefono =$4, estado =$5 where idpersona =$6',[apellidos, nombres, direccion, telefono,estado,id]);
        return res.status(200).json({
            message: 'Persona modificada correctamente'
        });
    } catch (error) {
        return res.status(500).json('Error al editar Persona '+error.message);
    }
};
export const deletePersona = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('delete from personas where idpersona  = $1', [id]);
        return res.status(200).json({
            message: 'Persona eliminada correctamente...!'
        });
    } catch (e) {
        return res.status(500).json('Error al eliminar persona');
    }
};
