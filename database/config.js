const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        console.log('DB connection')
    } catch (error) {
        console.log(error)
        throw new Error('Error para iniciar la conexion con la base de datos')
    }
}

module.exports = {
    dbConnection
}