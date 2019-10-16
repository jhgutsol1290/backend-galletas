const { model, Schema } = require('mongoose')

const productoSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    }, 
    precio: {
        type: Number
    },
    imagen: {
        type: String
    }
})

module.exports = model('Productos', productoSchema)
