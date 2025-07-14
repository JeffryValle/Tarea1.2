import { validateProducto } from '../schema/producto.schema.js';
import { existeCategoriaById } from '../models/categoria.model.js';
import { 
    existeProducto, 
    modelActualizarProducto, 
    modelCrearProducto, 
    modelEliminarProducto, 
    modelGetAllProductos, 
    modelGetProductoById 
} from '../models/producto.model.js';

//? Obtener todos los productos
export const getProductos = async (req, res) => {
    
    try {
        
        const productos = await modelGetAllProductos();

        if ( productos.length === 0 ) {
            return res.status(404).json({ error: 'No hay productos disponibles' });
        }

        res.status(200).json(productos);

    } catch (error) {
        res.status(400).json({ error: 'Error al obtener los productos' });
    }

}

//? Obtener los productos que esten disponibles
export const getProductosDisponibles = async (req, res) => {
    
    try {

        const productos = await getProductosDisponibles();

        if ( productos.length === 0 ) {
            return res.status(200).json({ message: 'No hay productos disponibles' });
        }

        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener los productos disponibles' });
    }

}


//? Obtener un producto por su id
export const getProductoById = async (req, res) => {
    
    const { id } = req.params;

    try {
        
        const producto = await modelGetProductoById( id );
        
        if ( !producto ) {
            res.status( 200 ).json({ message: 'Producto no existe' });
            return
        }

        res.status( 200 ).json( producto );

    } catch (error) {
        res.status(400).json({ error: 'Error al obtener el producto' });
    }
}


//? Crear un producto
export const crearProducto = async (req, res) => {
    
    const data = req.body;

    const { success, err, data: safeData } = validateProducto( data );

    try {
        
        if ( !success ) {
            res.status(400).json({ 
                message: 'Rectificar los datos', 
                errors: err
            });
            return 
        }

        const categoria = await existeCategoriaById( safeData.categoriaId );

        if ( !categoria ) {
            res.status(404).json({ message: 'La categoria no existe' });
            return
        }
        const producto = await modelCrearProducto( safeData );

        if ( !producto ) {
            res.status(400).json({ message: 'Error al crear el producto' });
            return 
        }

        res.status(201).json({
            message: 'Producto creado exitosamente',
            safeData,
        })

    } catch (error) {
        
    }
}


//? Actualizar un producto
export const actualizarProducto = async (req, res) => {
    
    const { id } = req.params;
    const data = req.body;

    const { success, err, data: safeData } = validateProducto( data );

    try {

        if ( !success ) {
            res.status(400).json({ 
                message: 'Rectificar los datos', 
                errors: err
            });
            return 
        }

        const producto = await existeProducto( id );
        if ( !producto ) {
            res.status(404).json({ message: 'No existe ese producto' });
            return
        }

        const categoria = await existeCategoriaById( data.categoriaId );
        if ( !categoria ) {
            res.status(404).json({ message: 'La categoria no existe' });
            return 
        }
        
        await modelActualizarProducto( id, safeData );

        res.status(200).json({
            message: 'Producto actualizado exitosamente',
            safeData,
        });

    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el producto' });
    }

}


//? Eliminar un producto
export const eliminarProducto = async(req, res) => {

    const { id } = req.params;
    
    try {

        const isActive = await existeProducto( id );

        if ( !isActive ) {
            res.status(404).json({ message: 'No existe ese producto'});
            return
        }

        await modelEliminarProducto( id );

        res.status(200).json({
            message: 'Producto eliminado exitosamente',
        });

        return

    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el producto' });
    }
}