const express = require('express')
const cors = require('cors')

//cargar DB
require('./db')

//cargar rutas
const routes = require('./routes')

//crear el servidor
const app = express()

//bodyParser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//habilitar cors - permite cliente se conecte de otro servidor para intercmabiar recursos
app.use(cors())

//Rutas de la app
app.use(routes)

//carpeta pública
app.use(express.static('uploads'))

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Server on port ${port}`))