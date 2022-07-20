import { pool } from '../database'

export const getPersona = async (req,res)=>{
    try {
        const response = await pool.query('select * from personas');
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json('Error al listar personas')
    }
};