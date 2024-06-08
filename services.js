import {pool} from './database.js';

const getProductos = async() => {
    const data = await pool.query('SELECT * FROM productos');
    return data.rows;
}

const getProductosById = async(id) => {
    const data = await pool.query('SELECT * FROM productos WHERE id=$1', [id]);
    return data.rows;
}

const createProducts = async(product) =>{
    const query = "INSERT INTO productos(nombre, precio) values($1, $2)";
    const values = [product.nombre, product.precio];
    await pool.query(query, values);
    return product;
};

const updateProducts = async(product, id) =>{
    const query = "UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3";
    const values = [product.nombre, product.precio, id];
    await pool.query(query, values);
    return {id: id, nombre: product.nombre, precio: product.precio};
};

const deleteProducts = async(id) =>{

    const data = await pool.query('SELECT * FROM productos WHERE id=$1', [id]);

    const query = "DELETE from productos WHERE id = $1";
    const values = [id];
    await pool.query(query, values);

    return data.rows;
}

export default {getProductos, getProductosById, createProducts, updateProducts, deleteProducts};