const Pedidos = require('../models/Pedidos')

const ctrl = {}

//mostrar todos los pedidos
ctrl.mostrarPedidos = async (req, res) => {
    try {

        const pedidos = await Pedidos.find()
                                    .populate('cliente')
                                    .populate({
                                        path: 'pedido.producto',
                                        model: 'Productos'
                                    })
        return res.json(pedidos)

    } catch (error) {
              
        return res.status(500).json({mensaje: 'Error en el servidor'})

    }
}

//Crear un nuevo pedido
ctrl.nuevoPedido = async (req, res) => {

    const pedido = new Pedidos(req.body)

    try {
        
        await pedido.save()
        return res.json({mensaje: 'Pedido añadido correctamente'})

    } catch (error) {
                      
        return res.status(500).json({mensaje: 'Error en el servidor'})

    }
}

//Mostrar un sólo pedido por ID
ctrl.mostrarPedido = async (req, res) => {
    try {
        
        const pedido = await Pedidos.findById(req.params.id)
                                    .populate('cliente')
                                    .populate({
                                        path: 'pedido.producto',
                                        model: 'Productos'
                                    })
        return res.json(pedido)

    } catch (error) {
                             
        return res.status(500).json({mensaje: 'Error en el servidor'})

    }
}

//editar pedido por ID
ctrl.editarPedido = async (req, res) => {
    try {
        
        let pedido = await Pedidos.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true
        })
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        return res.json(pedido)

    } catch (error) {
                                   
        return res.status(500).json({mensaje: 'Error en el servidor'})

    }
}

//eliminar pedido por ID
ctrl.eliminarPedido = async (req, res) => {
    try {
        
        await Pedidos.findByIdAndDelete({_id: req.params.id})
        return res.json({mensaje: 'Pedido eliminado correctamente'})

    } catch (error) {
                                   
        return res.status(500).json({mensaje: 'Error en el servidor'})
        
    }
}

module.exports = ctrl