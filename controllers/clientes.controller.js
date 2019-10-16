const Clientes = require('../models/Clientes')

const ctrl = {}

//mostrar clientes
ctrl.mostrarClientes = async (req, res) => {
    try {
        
        const clientes = await Clientes.find({})
        return res.json(clientes)

    } catch (error) {
        
        return res.status(500).json({mensaje: 'Error en el servidor'})

    }
}

//crear nuevo cliente
ctrl.nuevoCliente = async (req, res, next) => {

    const cliente = new Clientes(req.body)

    try {
        
        await cliente.save()
        return res.json({mensaje: 'Cliente agregado correctamente'})

    } catch (error) {
        
        res.send(error)
        next()

    }
}

//mostrar cliente por ID
ctrl.mostrarCliente = async (req, res) => {
    
    const { id } = req.params

    try {
        
        const cliente = await Clientes.findById(id)
        return res.json(cliente)

    } catch (error) {
           
        console.log(error)
        return res.status(500).json({mensaje: 'Error en el servidor'})

    }
}

//actualizar cliente por ID
ctrl.editarCliente = async (req, res, next) => {

    const { id } = req.params

    try {
        
        await Clientes.findOneAndUpdate({_id: id}, req.body, {
            new: true
        })

        return res.json({mensaje: 'Cliente actualizado satisfactoriamente'})

    } catch (error) {
               
        res.send(error)
        next()

    }
}

//elimina cliente
ctrl.eliminarCliente = async (req, res) => {
    const { id } = req.params

    try {
        
        await Clientes.findOneAndDelete({_id: id})

        return res.json({mensaje: 'Cliente aliminado satisfactoriamente'})

    } catch (error) {
               
        console.log(error)
        return res.status(500).json({mensaje: 'Error en el servidor'})

    }
}


module.exports = ctrl