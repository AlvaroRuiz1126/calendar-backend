//Aca va toda la logica de las funciones de las rutas que tengamos definidas
//const {validationResult} = require('express-validator')
//importa en la variable User el modelo de los usuarios
const User = require('./../models/users')
const bcryptjs = require('bcryptjs')
const { jwtGenerate } = require('../helpers/jwt')

const userCreate = async(req, res) => {
    //impresion de la solicitud del ususario
    //console.log(req.body)
    const {name, email, password} = req.body
    
    try {
        let user = await User.findOne({email})
        //console.log(validateUser)

        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario existente con el mismo correo'
            })
        }

        user = new User(req.body)

        //encriptacion de la contraseña
        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password, salt)
    
        //guarda el dato en la base de datos
        await user.save()

        //generar un token
        const token = await jwtGenerate(user.id, user.name)

        res.status(201).json({
            ok: true,
            msg: 'Register',
            uid: user.id,
            name: user.name,
            token
            // name,
            // email,
            // password
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    //para el manejo de errores de las validaciones
    // const errors = validationResult(req)
    //console.log(errors)

    // if(!errors.isEmpty()){
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.mapped()
    //     })
    // }

    // if(name.length < 5){
    //     return res.status(400).json({
    //         ok: false,
    //         msg: 'El nombre debe tener mas de 5 caracteres'
    //     })
    // }

}

const userLogin = async(req, res) => {
    const {email, password} = req.body

    try {
        //primero se busca validar de que exista un usuario con el email enviado
        const user = await User.findOne({email})
        //console.log(validateUser)

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existente con el correo'
            })
        }

        //confirmar las constraseñas
        const validPassword = bcryptjs.compareSync(password, user.password)

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña Incorrecta'
            })
        }

        //generar un token
        const token = await jwtGenerate(user.id, user.name)

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })    
    }
    // const errors = validationResult(req)

    // if(!errors.isEmpty()){
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.mapped()
    //     })
    // }

    // res.json({
    //     ok: true,
    //     msg: 'Login'
    // })
}

const tokenRevalid = async(req, res) => {
    const uid = req.uid
    const name = req.name

    const token = await jwtGenerate(uid, name)

    res.json({
        ok: true,
        msg: 'Renew token',
        uid,
        name,
        token
    })
}

module.exports = {
    userCreate,
    userLogin,
    tokenRevalid
}