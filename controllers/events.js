const { response } = require('express')
const Event = require('./../models/events')

const getEvents = async (req, res = response) => {
    //con esto se traen todos los datos de la base de datos
    const events = await Event.find()
        .populate('user', 'name')//el populate me permite ver un dato en especifico que este relacionado
    //en la base de datos. Aca tomo del user y extraigo el name dle arreglo de los
    //eventos
    res.json({
        ok: true,
        msg: 'getEvents',
        events
    })
}

const createEvent = async (req, res = response) => {
    //console.log(req.body)
    const event = new Event(req.body)

    try {
        //le asignamos al modelo, en el cmapo del user, el uid que viene en la request con el jwt
        event.user = req.uid
        const eventDB = await event.save()
        res.json({
            ok: true,
            event: eventDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateEvent = async (req, res = response) => {
    //los datos que se envian por URL llegan por req en los params
    const eventId = req.params.id
    const uid = req.uid

    try {
        //veifico que el id exista en la base de datos
        const event = await Event.findById(eventId)
        //console.log(event.user)

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if (event.user !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene el provilegio de editar el evento'
            })
        }

        //se toman los datos que se hacen llegar para la actualizacion del evento
        const newEvent = {
            ...req.body,
            user: uid
        }

        //aca se hace el query a la base de datos para que busque el evento por el id enviado en la peticion y lo actualice
        //con la nueva informacion
        //esta funcion retorna por defecto el antiguo dato antes de ser actualizado, con la configuracion {new: true}, retorna el actualizado
        const updateEventDB = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        res.json({
            ok: true,
            event: updateEventDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    // res.json({
    //     ok: true,
    //     msg: 'updateEvents',
    //     eventId
    // })
}

const deleteEvent = async (req, res = response) => {
    //los datos que se envian por URL llegan por req en los params
    const eventId = req.params.id
    const uid = req.uid

    try {
        //veifico que el id exista en la base de datos
        const event = await Event.findById(eventId)
        //console.log(event.user)

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if (event.user !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene el provilegio de eliminar el evento'
            })
        }

        await Event.findByIdAndDelete(eventId)

        res.json({ok: true})

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    // res.json({
    //     ok: true,
    //     msg: 'deleteEvents',
    //     events
    // })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}