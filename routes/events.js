/*
    Route to Events: host + /api/events
*/


const { Router } = require('express');
const { validateJWT } = require('../middlewares/validateJWT');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { isDate } = require('../helpers/isDate');

const router = Router();

// Especifico usar este middleware en todas las rutas
// en lugar de pasar éste middleware a cada una de las rutas.
router.use(validateJWT)

router.get('/', getEvents);
router.post('/',
    [
        check('title', 'El título es requerido').not().isEmpty(),
        check('start', 'La fecha de inicio es requerido').custom(isDate),
        check('end', 'La fecha de finalizado es requerido').custom(isDate),
        fieldsValidator
    ],
    createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;