const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');
require('dotenv').config()

//console.log(process.env)

//crea el servidor de express
const app = express();

//database
dbConnection()

//CORS
app.use(cors())

//para mostrar el index.html
//el .use() es un middleware que se ejecuta cuando alguien pasa por un lugar en especifico
//el express.static me muestra el index.html
app.use(express.static('public'))

//lectura ya parseo del body
//esto nos permite leer la informacion enviada sin necesidadde librerias de terceros
app.use(express.json())

//Rutas
//aca esta el path al que se le hacen las peticiones, es como la ruta principal de donde salen las demas.
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     })
// })

//escucha peticiones
//para acceder a las variables de entorno
app.listen(process.env.PORT, () => {
    console.log('Programa corriendo en el puerto ' + process.env.PORT)
})