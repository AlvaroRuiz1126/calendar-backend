const {Router} = require('express')
//importacion del controlador
const { userCreate, userLogin, tokenRevalid } = require('../controllers/auth')
const {check} = require('express-validator')
//aca es donde se importa el custom middleware
const { fieldValidate } = require('../middlewares/validate')
const {jwtValidate} = require('../middlewares/jwtValidate')
const router = Router()

//el path de aca se le concatena con lo que se tiene en el app.use
//localhost:4000/api/auth + la ruta de aca
router.post(
    '/new',
    //el chack es un middleware que me permite hacer validaciones con express-validator.
    //se coloca en corchetes para poder hacer varias
    [
        check('name','Nombre es obligatorio').not().isEmpty(),
        check('email','Email es obligatorio').isEmail(),
        check('password','Password debe ser de 6 o mas caracteres').isLength({min: 6}),
        fieldValidate
    ],
    userCreate
)

router.post(
    '/',
    [
        check('email','Email es obligatorio').isEmail(),
        check('password','Password debe ser de 6 o mas caracteres').isLength({min: 6}),
        fieldValidate
    ],
    userLogin
)

router.get('/renew', jwtValidate, tokenRevalid)

module.exports = router