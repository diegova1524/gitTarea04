const express = require('express');
const app = express();
app.use(express.json());

let clientes = [
  { id: 1, nombre: 'Diego' },
  { id: 2, nombre: 'Vanessa' },
  { id: 3, nombre: 'Erick' }
];

let productos = [
  { id: 1, nombre: 'Coca-cola', precio: '50' },
  { id: 2, nombre: 'Inca kola', precio: '50' },
  { id: 3, nombre: 'Fanta', precio: '40' }
];

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido a la página principal');
});

// Ruta para mostrar clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// Ruta para mostrar productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Ruta para agregar un cliente
app.post('/clientes', (req, res) => {
  const nuevoCliente = req.body;
  clientes.push(nuevoCliente);
  res.status(201).json(nuevoCliente);
});

// Ruta para agregar un producto
app.post('/productos', (req, res) => {
  const nuevoProducto = req.body;
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// Ruta para actualizar un cliente
app.put('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const clienteActualizado = req.body;
  const index = clientes.findIndex(cliente => cliente.id === id);
  if (index !== -1) {
    clientes[index] = { ...clientes[index], ...clienteActualizado };
    res.json(clientes[index]);
  } else {
    res.status(404).json({ mensaje: 'Cliente no encontrado' });
  }
});

// Ruta para actualizar un producto
app.put('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productoActualizado = req.body;
  const index = productos.findIndex(producto => producto.id === id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...productoActualizado };
    res.json(productos[index]);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

// Ruta para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(cliente => cliente.id === id);
  if (index !== -1) {
    clientes.splice(index, 1);
    res.json({ mensaje: 'Cliente eliminado exitosamente' });
  } else {
    res.status(404).json({ mensaje: 'Cliente no encontrado' });
  }
});

// Ruta para eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(producto => producto.id === id);
  if (index !== -1) {
    productos.splice(index, 1);
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

// Escuchar en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
