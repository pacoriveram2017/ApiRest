//Esto es una aplicación de Node.js
//Crear un proyecto de Node.js: npm init -y
//Instalar express: npm i express
//Vamos a crear un servidor web con express **codigo** => Infraestructura con codigo

//Importar express
import express from 'express';
import cors from 'cors';
import conectar, {pool} from './database.js';
import services from './services.js';

//Crear una aplicación de express. A partir de ahora **app** es el servidor
const app = express();
//Middleware: capa que se ejecuta antes de llamada de un servicio
app.use(express.json());
app.use(cors());
//Crear una ruta(post, get, put, delete) **peticiones** endpoint
//El endpoint tinee una ruta (nombre), dos parametros request(peticion) y response(respuesta)
//Request contiene la información de la petición que hace el cliente
//Response contiene la información que el servidor devuelve al cliente
/*
const productos =[
    {
        id: 1, nombre: 'Producto 1', precio: 3383
    },
    {
        id: 2, nombre: 'Producto 2', precio: 139
    },
    {
        id: 3, nombre: 'Producto 3', precio: 3193
    }

]
*/

app.get('/productos', async(req, res) => {
    const data = await services.getProductos();
    res.status(200).json(data)
})

//Crear un consulta usando JS para buscar un producto por id
app.get('/productos/:id', async(req, res)=>{
    const id = req.params.id;
    //find: busca en un arreglo
    //const producto = productos.find(p => p.id == id);
    const producto = await services.getProductosById(id);

    if(producto===null){
        res.status(400).send('No se encontró ningún producto');
    }

    res.status(200).json(producto);
});

//Creamos el metodo para agregar un producto
app.post('/productos', async(req, res) =>{
    const body = req.body;

    //productos.push(body);
    await services.createProducts(body);

    res.status(200).send("Producto añadido");
});

//Crear un método para actualizar un producto
app.put('/productos/:id', async(req, res)=>{
    const id = req.params.id;
    const body = req.body;
    
    /*
    const productoIndex = productos.findIndex(p => p.id == id);
    
    if(productoIndex === -1){
        res.status(400).send('No se encontró ningún producto');
    }
    
    productos[productoIndex] = body;
    */
    await services.updateProducts(body, id);
    
    res.status(200).send("Producto actualizado");
});

//Crear un método para eliminar un producto
app.delete('/productos/:id', async(req, res)=>{
    const id = req.params.id;
    
    /*
    const productoIndex = productos.findIndex(p => p.id == id);
    
    if(productoIndex === -1){
        res.status(400).send('No se encontró ningún producto');
    }
    
    productos.splice(productoIndex, 1);
    */

    const data = await services.deleteProducts(id);

    if(data===null){
        res.status(500).send("No se elimino el producto");
    }
    
    res.status(200).send("Producto eliminado");
});

const port = 3800;
conectar();
//La aplicación usará este puerto
app.listen(port, () =>{
    console.log('Servidor escuchando en el puerto', port)
});

