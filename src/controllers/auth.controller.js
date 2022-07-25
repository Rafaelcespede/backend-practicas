import { pool } from "../database.js";

// const controller = {}
// const jwt = require('jsonwebtoken');
// const config = require('../config.json');
// const bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken'
// import config from '../config.json'
import bcrypt from 'bcryptjs'
const refreshTokens = [];

    const secret = "leidy-decret-access-token"
    const refreshTokenSecret = "leidy-decret-refresh-access-token"
    // const port = 3000
    // const tokenLife = 900
    // const refreshTokenLife = 86400

// controller.login = async (req, res) => {
/*
export const login = async (req, res) => {
    const { username, password } = req.body;
    // console.log('~~ post ~~\n' + 'username: ' + username + '\npassword: ' + password + '\n~~~~~~~~~~~~')
    const response = await pool.query("select * from fc_validar_usuario($1);", [username], function (err, result) {
        try {
            // Hashear password
            // let passwordhashed = bcrypt.hashSync(password, 8);
            // console.log({ message: passwordhashed })
            const rUser = result[0][0].username;
            if (rUser == username) {
                const hashSaved = result[0][0].password;
                let compare = bcrypt.compareSync(password, hashSaved);
                if (compare) {
                    const username = {
                        idper: result[0][0]["idpersona"],
                        iduser: result[0][0]["idusuario"],
                        username: result[0][0]["username"],
                        rol: result[0][0]["nombre"],
                        nombres: result[0][0]["nombres"]
                    }
                    const accessToken = jwt.sign({ username }, secret, { expiresIn: '32s' });
                    const refreshToken = jwt.sign({ username }, refreshTokenSecret);
                    refreshTokens.push(refreshToken);
                    return res.json({ message: 'validacion exitosa', accessToken, refreshToken });
                } else {
                    return res.json({ message: 'no son iguales' });
                }
            } else {
                return res.json({ message: 'Ingrese corretamente sus credenciales!' });
            }
        } catch (error) {
            return res.json({ message: '' + error });
        }
    });
};*/

export const login = async (req, res)=>{
    try {
       const {username, password} = req.body;
       console.log(username);
       console.log(password);
       const response = await pool.query('SELECT * FROM fc_validar_usuario($1)', [username]);      
       if(response.rows.length!=0){           
           const passold = response.rows[0].password;
           console.log(passold);
           if(await bcrypt.compare(password, passold)){
                console.log(password);
                const user = {
                    iduser : response.rows[0].idusuario,
                    nombres : response.rows[0].nombres+' '+response.rows[0].apellidos,
                    username : response.rows[0].username,
                    rol : response.rows[0].nombre
                }
                const accessToken = jwt.sign({user}, config.secret, {expiresIn:'32s'});
                const refreshToken = jwt.sign({user}, config.refreshTokenSecret);
                refreshTokens.push(refreshToken);
                return res.status(200).json({
                    accessToken,
                    refreshToken
                });
           }else{
                return res.status(200).json(
                    'Username o Password incorrectos...!'
                );
           }           
       }
       return res.status(200).json(
           'Username o Password incorrectos...!'
       );
    } catch (e) {
        console.log(e);
        return res.status(500).json('Error al validar usuario...!');
    }    
};





// controller.registrar = async (req, res) => {
export const registrar = async (req, res) => {
    let sql = "SELECT * FROM fc_create_usuario (?,?,?,?);"
    const { username, password, idpersona, idrol } = req.body;
    // Hashear password
    let passwordhashed = bcrypt.hashSync(password, 8);
    // console.log({ message: passwordhashed })
    pool.query(sql, [username, passwordhashed, idpersona, idrol], function (err, result) {
        try {
            return res.json({ result });
        } catch (error) {
            return res.json({ e });
        }
    });
};

export const token = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) { return res.sendStatus(401); }
        if (!refreshTokens.includes(token)) { return res.sendStatus(403); }
        jwt.verify(token, refreshTokenSecret, (err, user) => {
            if (err) { return res.sendStatus(403); }
        });
    } catch (e) { console.log(e); }
};