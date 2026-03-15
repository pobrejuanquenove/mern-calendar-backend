const { response } = require('express');
const jwt = require('jsonwebtoken');
const validateJWT = async (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            "ok": false,
            "msg": "No hay token"
        })
    }

    try {
        const { uuid, name } = await jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uuid = uuid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            "ok": false,
            "msg": "Token no válido"
        })

    }
    next();
}

module.exports = { validateJWT }