const { model, Schema } = require('mongoose')

const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    },
    entregado: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Pedidos', pedidosSchema)