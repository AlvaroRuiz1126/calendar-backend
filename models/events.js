const {Schema, model} = require('mongoose')
const events = require('../controllers/events')

const eventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        //esto le indica a mongoose que se va hcer una referencia en el Schema de Users
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
})

//esta funcion solo se activa cada vez que se llame el metodo toJSON que funciona internamente en mongoose cada vez que se hace un
//llamado a la base de datos
//Ademas, eliminamos las propiedades __v y _id para que sea mucho mas vistoso
eventSchema.method('toJSON', function (){
    const {__v, _id, ...object} = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Events', eventSchema)