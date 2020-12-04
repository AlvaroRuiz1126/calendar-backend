const { Router } = require('express')
const { check } = require('express-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { isDate } = require('../helpers/isDate')
const { jwtValidate } = require('../middlewares/jwtValidate')
const { fieldValidate } = require('../middlewares/validate')
const router = Router()

//con esta instruccion puedo asignar el mismo middleware a cada una de las rutas que se encuentren debajo de esta linea
router.use(jwtValidate)

router.get('/', getEvents)

router.post(
    '/',
    [
        check('title', 'Titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        fieldValidate
    ], 
    createEvent)

router.put('/:id', updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router