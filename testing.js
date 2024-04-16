import ProductManager from "./src/productManager.js";

const products = new ProductManager();

//console.log (products.getProducts())

const productoActualizar = {
    "id": 6,
    "title": "Disco Eterno",
    "description": "Soda Stereo",
    "price": 3000,
    "image":"imagen6",
    "code":"abc130",
    "stock":5,
}

products.modificarProducts(productoActualizar).then(() => {
    console.log("Producto modificado exitosamente.");
}).catch(error => {
    console.error("Error al modificar el producto:", error);
});
