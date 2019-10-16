const Productos = require('../models/Productos')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')
const fs = require('fs-extra')

const ctrl = {}

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');


//subir archivo
ctrl.subirArchivo = async (req, res, next) => {
    upload(req, res, (error) => {
        if(error) {
            return res.json({mensaje: error})
        }

        return next()
    })
}

//controller para mostrar todos los productos
ctrl.mostrarProductos = async (req, res) => {
    try {

        const productos = await Productos.find({})

        if(!productos) {

            return res.json({mensaje: 'No hay productos en la BD'})

        }
        return res.json(productos)

    } catch (error) {
        return res.status(500).json(error)
    }
}

//crear productos
ctrl.nuevoProducto = async (req, res) => {
    const producto = new Productos(req.body)
    try {
        
        //si existe archivo instancia de producto se le asigna ese archivo
        if(req.file.filename) {

            producto.imagen = req.file.filename

        }

        await producto.save()
        return res.json({mensaje: 'Producto agregado correctamente'})

    } catch (error) {

        return res.status(500).json(error)
        
    }
}

//mostrar producto por ID
ctrl.mostrarProducto = async (req, res) => {

    const { id } = req.params
    try {
        
        const producto = await Productos.findById(id)
        if(!producto) {

            return res.status(404).json({mensaje: 'ID de prodcuto no existe'})

        }

        return res.json(producto)

    } catch (error) {
        
        return res.status(500).json(error)
        
    }

}

//editar un producto por ID
ctrl.editarProducto = async (req, res) => {
    
    const { id } = req.params

    try {

        //construir producto
        let nuevoProducto = req.body

        //verificar si hay imagen nueva
        if(req.file) {

            nuevoProducto.imagen = req.file.filename

        } else {

            let productoAnterior = await Productos.findById(id)
            nuevoProducto.imagen = productoAnterior.imagen

        }

        const producto = await Productos.findOneAndUpdate({_id: id}, nuevoProducto, {
            new: true
        })

        return res.json({mensaje: 'Producto actualizado correctamente'})

    } catch (error) {
        
        return res.status(500).json(error)
        
    }
}

//elimina producto
ctrl.eliminarProducto = async (req, res) => {

    const { id } = req.params

    try {
        const producto = await Productos.findOne({_id: id})
        if(producto) {

            await fs.unlink(path.resolve('../backend/uploads/' + producto.imagen))
            await producto.remove()
            return res.json({mensaje: 'Producto eliminado correctamente'})

        } else {

            return res.status(404).json({mensaje: 'ID de prodcuto no existe'})

        }
    } catch (error) {
         
        console.log(error)
        return res.status(500).json(error)
        
    }

}

ctrl.buscarProducto = async (req, res) => {

    const { query } = req.params

    try {
        
        //const producto = await Productos.find({nombre: new RegExp(query, 'i')})
        const producto = await Productos.find({nombre: {$regex: '.*'+query+'.*', $options: 'i'}})
        res.json(producto)

    } catch (error) {
        
        console.log(error)
        next()

    }

}


module.exports = ctrl