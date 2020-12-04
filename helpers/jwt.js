const jwt = require('jsonwebtoken')

const jwtGenerate = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = {uid, name}

        //generamos el token
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            //expiracion
            expiresIn: '2h'
        }, (error, token) => {
            if(error){
                console.log(error)
                reject('No se puedo generar el token')
            }

            resolve(token)
        })
    })
}

module.exports = {
    jwtGenerate
}