import pool from "../config/database_config.js";


export const modelGetAllProductos = async () => {

    const query = 'SELECT * FROM productos;';
    const [ rows ] = await pool.query(query);
    return rows;
}

export const modelGetProductosDisponibles = async () => {

    const query = 'SELECT * FROM productos WHERE disponible;'
    const [ rows ] = await pool.query(query);
    return rows;
}

export const modelGetProductoById = async ( id ) => {

    const query = 'SELECT * FROM productos WHERE id = ?;';
    const [ rows ] = await pool.query(query, [ id ]);
    console.log(rows);
    return rows[0];
}   

export const modelCrearProducto = async ( data ) => {

    const { nombre, precio, descripcion, disponible, categoriaId } = data;
    const cnx = await pool.getConnection();
    try {
        
        await cnx.beginTransaction();

        const query = `INSERT INTO productos 
                (nombre, precio, descripcion, disponible, categoria_id) 
                VALUES (?, ?, ?, ?, ?);`;

        await cnx.execute(query, [ nombre, precio, descripcion, disponible, categoriaId ]);

        await cnx.commit();
        return
    } catch (error) {
        await cnx.rollback();
        throw error
    } finally {
        cnx.release();
    }
}

export const modelActualizarProducto = async ( id, data ) => {

    const { nombre, precio, descripcion, disponible, categoriaId } = data;
    const cnx = await pool.getConnection();

    try {
        await cnx.beginTransaction();

        const query = `UPDATE productos 
            SET nombre = ?, precio = ?, descripcion = ?, disponible = ?, categoria_id = ? 
            WHERE id = ?;`;

        await cnx.execute(query, [ nombre, precio, descripcion, disponible, categoriaId, id ]);
        
        await cnx.commit();   
        return

    } catch (error) {
        await cnx.rollback();
        throw error
    } finally {
        cnx.release();
    }    
}

export const modelEliminarProducto = async ( id ) => {

    console.log(id);
    const cnx = await pool.getConnection();
    try {
        await cnx.beginTransaction();

        const query = 'DELETE FROM productos WHERE id = ?;';
        const resp = await cnx.execute(query, [ id ]);

        await cnx.commit();
        return 
    } catch (error) {
        await cnx.rollback();
        throw error
    } finally {
        cnx.release();
    }
}

export const existeProducto = async ( id ) => {

    const query = 'SELECT * FROM productos WHERE id = ?;';
    const [ rows ] = await pool.query(query, [ id ]);
    
    return rows[0];
}