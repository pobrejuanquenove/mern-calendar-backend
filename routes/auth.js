/*
    Route to Auth: host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { revalidateToken, createUser, loginUser } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { validateJWT } = require('../middlewares/validateJWT')

router.get('/renew',
    [
        validateJWT
    ],
    revalidateToken);

router.post('/',     // middlewars de express-validator
    [
        check('email', 'El email es obligatorio"').isEmail(),
        check('password', 'El password es obligatorio"').isLength({ min: 6 }),
        fieldsValidator
    ],
    loginUser);

router.post('/new',
    // middlewars de express-validator
    [
        check('name', 'El name es obligatorio"').not().isEmpty(),
        check('email', 'El email es obligatorio"').isEmail(),
        check('password', 'El password es obligatorio"').isLength({ min: 6 }),
        fieldsValidator
    ],
    createUser);

module.exports = router;