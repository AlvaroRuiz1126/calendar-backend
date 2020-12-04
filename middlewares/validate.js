const express = require('express')
const {validationResult} = require('express-validator')

const fieldValidate = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    //el next es una funcion que llaman los middlewares una vez que obtiene un resultado satisfactorio
    next()
}

module.exports = {
    fieldValidate
}