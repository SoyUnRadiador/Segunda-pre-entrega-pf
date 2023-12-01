const express = require('express');
const router = express.Router();
const { productManagerInstance } = require('./productManager');
const Carts = require('./models/carts');
const Product = require('./models/product');
const Carrito = require('./carrito');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');


// Crea una instancia de Carrito
const carrito = new Carrito();


// Configura la ruta para mostrar el carrito
router.get('/carts/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid; // Obtener el cartId desde los parámetros de la URL
    const productosCarrito = await carritoService.obtenerProductosCarrito(cartId); // Obtener los productos del carrito

    res.render('carrito', { productosCarrito, cartId }); // Renderiza la vista 'carrito' con la información del carrito y sus productos
  } catch (error) {
    res.status(500).send('Error al obtener los productos del carrito');
  }
});


// Para buscar un carrito por su ID con Promesas
Carts.findById('ID_DEL_CARRO')
  .then(cart => {
    if (!cart) {
      console.log('Carrito no encontrado');
      // Realizar alguna acción si el carrito no se encuentra
    } else {
      console.log('Carrito encontrado:', cart);
      // Hacer algo con el carrito encontrado
    }
  })
  .catch(error => {
    console.error('Error al buscar el carrito:', error);
    // Manejar el error
  });

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
    const nuevoCarrito = carrito.crearCarrito(req.body.Products);
    res.status(201).json(nuevoCarrito);
});

router.get('/:cid', (req, res) => {
    const carritoID = parseInt(req.params.cid);

    // Busca el carrito por ID
    const carritoEncontrado = carrito.Carritos.find((c) => c.ID === carritoID);

    if (carritoEncontrado) {
        res.json(carritoEncontrado.Products);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

// Ruta para agregar productos a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const carritoID = parseInt(req.params.cid);
    const productoID = parseInt(req.params.pid);

    // Busca el carrito por ID
    const carritoEncontrado = carrito.Carritos.find((c) => c.ID === carritoID);

    if (carritoEncontrado) {
        const product = {
            product: productoID,
            quantity: 1,
        };

        // Verifica si el producto ya existe en el carrito
        const existingProduct = carritoEncontrado.Products.find((p) => p.product === productoID);

        if (existingProduct) {
            // Si ya existe, aumenta la cantidad en 1
            existingProduct.quantity += 1;
        } else {
            // Si no existe, agrega el producto al carrito
            carritoEncontrado.Products.push(product);
        }

        res.status(201).json(carritoEncontrado);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
const io = req.app.get('io'); // Obtiene el objeto Socket.io
io.emit('productoCambiado');

});


// DELETE api/carts/:cid/products/:pid: Eliminar un producto del carrito
router.delete('/:cid/products/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const cartIndex = carrito.Carritos.findIndex(c => c.ID === cartId);

  if (cartIndex === -1) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  const cart = carrito.Carritos[cartIndex];

  const productIndex = cart.Products.findIndex(p => p.product === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  }

  cart.Products.splice(productIndex, 1);

  return res.json({ message: 'Producto eliminado del carrito correctamente' });
});



  
  
// PUT api/carts/:cid: Actualizar el carrito con un arreglo de productos
  router.put('/:cid', async (req, res) => {
    try {
      const carts = await Carts.findById(req.params.cid);
  
      if (!carts) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      carts.products = req.body.products;
      await carts.save();
  
      res.json({ message: 'Carrito actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
// PUT api/carts/:cid/products/:pid: Actualizar la cantidad de un producto en el carrito

router.put('/:cid/products/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const newQuantity = parseInt(req.body.quantity);

  const cartIndex = carrito.Carritos.findIndex(c => c.ID === cartId);

  if (cartIndex === -1) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  const cart = carrito.Carritos[cartIndex];

  const productIndex = cart.Products.findIndex(p => p.product === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  }

  cart.Products[productIndex].quantity = newQuantity;

  return res.json({ message: 'Cantidad del producto actualizada correctamente' });
});

  
// DELETE api/carts/:cid: Eliminar todos los productos del carrito
router.delete('/:cid', (req, res) => {
  const cartId = parseInt(req.params.cid);

  const cartIndex = carrito.Carritos.findIndex(c => c.ID === cartId);

  if (cartIndex === -1) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  const cart = carrito.Carritos[cartIndex];

  cart.Products = [];

  return res.json({ message: 'Todos los productos fueron eliminados del carrito' });
});

  
  // GET api/carts/:cid: Obtener el carrito con productos completos
  router.get('/:cid', async (req, res) => {
    try {
      const carts = await Carts.findById(req.params.cid).populate('products', 'nombre descripcion precio cantidad');
  
      if (!carts) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      res.json(carts);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });


module.exports = router;