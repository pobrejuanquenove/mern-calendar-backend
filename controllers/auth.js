// para no perder el intellisense!
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

const { generateJWT } = require('../helpers/jwt');

const revalidateToken = async (req, res) => {

    const { uuid, name } = req;

    const token = await generateJWT(uuid, name);
    console.log(token)
    res.json({
        "ok": true,
        name,
        uuid,
        token
    })
}

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // verifico si existe el email
        let user = await Users.findOne({ email })

        if (user) {
            return res.status(400).json({
                "ok": false,
                "msg": "Un usuario ya existe con ese correo."
            })
        }

        user = new Users(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        await user.save();

        // Generar JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            "ok": true,
            "uuid": user.id,
            "name": user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "ok": false,
            "msg": "Por favor hable con el administrdor"
        })
    }
}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        // verifico si existe el email
        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(400).json({
                "ok": false,
                "msg": "El usuario no existe."
            })
        }

        // Confirmar password
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                "ok": false,
                "msg": "El password es incorrecto."
            })
        }

        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            "ok": true,
            "uuid": user.id,
            "name": user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            "ok": false,
            "msg": "Por favor hable con el administrdor"
        })
    }
}

module.exports = {
    revalidateToken,
    createUser,
    loginUser
}