import { 
    existeCategoriaById,
    existeCategoriaByName,
    modelActualizarCategoria, 
    modelCrearCategoria, 
    modelEliminarCategoria, 
    modelGetAllCategorias, 
    modelGetCategoriaById, 
    productoByCategoria
} from "../models/categoria.model.js";



export const getCategorias = async (req, res) => {
    try {
        const categorias = await modelGetAllCategorias();

        res.status(200).json({
            message: 'Categorias obtenidas correctamente',
            categorias: categorias
        });
        return 
    } catch (error) {
        res.status(400).json({
            message: 'Error al obtener las categorias ' + error.message,
        })
    }
}

export const getCategoriaById = async (req, res) => {

    const { id } = req.params;
    try {
        const resp = await modelGetCategoriaById( id );

        if (!resp) {
            return res.status(404).json({
                message: 'No existe una categoria con el id ' + id,
            });
        }

        res.status(200).json({resp});

        return
    } catch (error) {
        res.status(400).json({
            message: 'Error al obtener la categoria con id ' + id + ': ' + error.message,
        })
    }
}

export const crearCategoria = async (req, res) => {

    const { nombre } = req.body;

    try {
        const existe = await existeCategoriaByName( nombre );

        if ( existe ) {
            return res.status(400).json({
                message: 'Ya existe una categoria con ese nombre, debe agregar otro nombre',
            }); 
        }
        
        const nuevaCategoria = await modelCrearCategoria( nombre );

        res.status(201).json({
            message: 'Categoria creada correctamente',
            categoria: nuevaCategoria 
        });

        return

    } catch (error) {
        res.status(400).json({
            message: 'Error al crear la categoria: ' + error.message,
        });
    }

}

export const actualizarCategoria = async (req, res) => {

    const { id } = req.params;
    const { nombre } = req.body;

    try {

        const existe = await existeCategoriaById( id );

        if (!existe) {
            return res.status(404).json({   
                message: 'No existe una categoria con ese id ',
            });
        }
        
        await modelActualizarCategoria( id, nombre ); 

        res.status(200).json({
            message: 'Categoria actualizada correctamente',
            id, nombre, 
        });

        return

    } catch (error) {
        res.status(400).json({
            message: 'Error al actualizar la categoria con id ' + id + ': ' + error.message,
        });
    } 
}

export const eliminarCategoria = async (req, res) => {

    const { id } = req.params;

    try {

        const existeProducto = await productoByCategoria( id );

        if ( existeProducto ) {
            return res.status(400).json({
                message: 'No se puede eliminar la categoria porque tiene producto(s) asociados',
            }); 
        }

        await modelEliminarCategoria( id );

        res.status(200).json({
            message: 'Categoria eliminada correctamente',
        });

        return

    } catch (error) {
        res.status(400).json({
            message: 'Error al eliminar la categoria con id ' + id + ': ' + error.message,
        });
    }
}