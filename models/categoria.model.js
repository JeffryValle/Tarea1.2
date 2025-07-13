import pool from '../config/database_config.js';

export const modelGetAllCategorias = async () => {
    
    const query = 'SELECT nombre FROM categorias;';

    const [ rows ] = await pool.query(query);
    return rows;
}   

export const modelGetCategoriaById = async ( id ) => {

    const query = 'SELECT * FROM categorias WHERE id = ?;';

    const [ results ] = await pool.query( query, [ id ]); 
    return results[0];
}

export const modelCrearCategoria = async ( nombre ) => {

    const cnx = await pool.getConnection();
    try {
        await cnx.beginTransaction();

        const query = 'INSERT INTO categorias (nombre) VALUES (?);';
        await cnx.execute(query, [ nombre ]);

        await cnx.commit();
        return nombre;
    
    } catch (error) {
        cnx.rollback();
        throw error;
    } finally {
        cnx.release();
    }

}

export const modelActualizarCategoria = async ( id, nombre ) => {
    
    const cnx = await pool.getConnection();
    try {
        await cnx.beginTransaction();
        const query = 'UPDATE categorias SET nombre = ? WHERE id = ?;';
        await cnx.execute(query, [ nombre, id ]);

        await cnx.commit();
        return
    } catch (error) {
        await cnx.rollback();
        throw error;
    } finally {

        cnx.release();
        
    }
}

export const modelEliminarCategoria = async ( id ) => {

    const cnx = await pool.getConnection();
    try {
        await cnx.beginTransaction();

        const query = 'DELETE FROM categorias WHERE id = ?;';
        await cnx.execute(query, [ id ]);

        await cnx.commit();
        return;
    } catch (error) {
        await cnx.rollback();
        throw error;
    } finally {
        cnx.release();
    }

}

export const existeCategoriaByName = async ( nombre ) => {

    const query = 'SELECT nombre FROM categorias WHERE nombre = ?;';

    const [ rows ] = await pool.query(query, [ nombre ]);
    return rows[0];
}

export const existeCategoriaById = async ( id ) => {

    const query = 'SELECT nombre FROM categorias WHERE id = ?;';

    const [ rows ] = await pool.query(query, [ id ]);
    return rows[0];
}

export const productoByCategoria = async ( id ) => {
    
    const query = 'SELECT * FROM productos WHERE categoria_id = ?;';

    const [ rows ] = await pool.query(query, [ id ]);
    return rows[0];
}   