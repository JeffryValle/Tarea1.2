import pool from "../config/database_config";


export const getAllProductos = async () => {

    const query = 'SELECT * FROM productos;';
    const [ rows ] = await pool.query(query);

    return rows;
}

export const getProductosDisponibles = async () => {

    const query = 'SELECT * FROM productos WHERE disponible;'

    const [ rows ] = await pool.query(query);
    return rows;
}