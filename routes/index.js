const { Router } = require('express')

const {
    mostrarProductos,
    subirArchivo,
    nuevoProducto,
    mostrarProducto,
    editarProducto,
    eliminarProducto,
    buscarProducto
} = require('../controllers/productos.controller')

const {
    mostrarClientes,
    nuevoCliente,
    mostrarCliente,
    editarCliente,
    eliminarCliente
} = require('../controllers/clientes.controller')

const {
    mostrarPedidos,
    nuevoPedido,
    mostrarPedido,
    editarPedido,
    eliminarPedido
} = require('../controllers/pedidos.controller.js')

const router = Router()

////////////////////////////////////
// PRODUCTOS
////////////////////////////////////

//muestra los productos
router.get('/productos', 
    mostrarProductos
)

//crea un prodcuto
router.post('/productos',
    subirArchivo,
    nuevoProducto
)

//muestra un prodcuto
router.get('/productos/:id',
    mostrarProducto
)

//actualiza un prodcuto
router.put('/productos/:id',
    subirArchivo,
    editarProducto
)

//elimina producto por ID
router.delete('/productos/:id',
    eliminarProducto
)

router.post('/productos/busqueda/:query',
    buscarProducto
)

////////////////////////////////////
// CLIENTES
////////////////////////////////////

//mostrar todos los clientes
router.get('/clientes', 
    mostrarClientes
)

//crear cliente
router.post('/clientes',
    nuevoCliente
)

//mostrar cliente por ID
router.get('/clientes/:id',
    mostrarCliente,
)

router.put('/clientes/:id',
    editarCliente
)

router.delete('/clientes/:id', 
    eliminarCliente
)


////////////////////////////////////
// PEDIDOS
////////////////////////////////////

//Mostrar todos los pedidos
router.get('/pedidos', 
    mostrarPedidos
)

//crear nuevo pedido
router.post('/pedidos/nuevo/:id',
    nuevoPedido
)

//mostrar pedido por ID
router.get('/pedidos/:id',
    mostrarPedido
)

//editar pedido por ID
router.put('/pedidos/:id',
    editarPedido
)

router.delete('/pedidos/:id',
    eliminarPedido
)

module.exports = router