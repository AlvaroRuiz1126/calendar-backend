const moment = require('moment')

//const isDate = (value, {req, location, path}) => {
const isDate = (value) => {
    console.log(value)
    // console.log(req)
    // console.log(location)
    // console.log(path)

    //si el custom check retorna un false, esto por defecto toma el error ya definido en las rutas
    if(!value){
        return false
    }

    //se valida que en el campo start se haya enviado una fecha correcta
    const date = moment(value)

    //funcion de moment para validar de que la fecha sea correcta
    if(date.isValid()){
        return true
    }else{
        return false
    }
}

module.exports = { isDate }