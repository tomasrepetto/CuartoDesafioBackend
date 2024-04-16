import express from "express";
import { engine } from 'express-handlebars';
import { Server } from "socket.io";
import path from 'path'; 
import { dirname } from './utils.js'; 

import products from './routers/products.js';
import carts from './routers/carts.js';
import views from './routers/views.js';
import ProductManager from "./productManager.js";

const app = express();
const PORT = 8080;

const p = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(dirname, 'public'))); 

app.engine('handlebars', engine());
app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', views);
app.use('/api/products', products);
app.use('/api/carts', carts);

const expressServer = app.listen(PORT, () => {
    console.log(`Corriendo aplicación en el puerto ${PORT}`);
});

const socketServer = new Server(expressServer);

socketServer.on('connection', socket => {
    console.log('Cliente conectado')
    const productos = p.getProducts();
    socket.emit('productos', productos);

    socket.on('agregarProducto', producto => {
        const result = p.addProduct(producto);
        if(result.producto)
        socket.emit('productos', result.producto);
    })
});


