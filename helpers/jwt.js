const jwt = require('jsonwebtoken');

const generateJWT = (uuid, name) => {

    return new Promise((resulve, reject) => {
        const payload = { uuid, name };
        jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '2h' },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('No se pudo generar el token')
                }

                resulve(token)
            }
        )

    })
}

module.exports = { generateJWT };