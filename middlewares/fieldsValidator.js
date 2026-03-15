const { response } = require('express');
const { validationResult } = require('express-validator');
const fieldsValidator = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped())
    }

    // llamamos a next() (callback) para continuar
    // si no hay errores. next() = la función que sigue
    next();
}

module.exports = {
    fieldsValidator
}