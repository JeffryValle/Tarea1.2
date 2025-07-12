import { no } from "zod/locales";
import { 
    modelActualizarCategoria, 
    modelCrearCategoria, 
    modelEliminarCategoria, 
    modelGetAllCategorias, 
    modelGetCategoriaById 
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
        const nuevaCategoria = await modelCrearCategoria( nombre );

        if (!nuevaCategoria 
            || nuevaCategoria.toLowerCase().trim() === nombre.toLowerCase().trim()
        ) {
            res.status(400).json({
                message: 'Ya existe una categoria con el nombre ' + nombre,
            });
            return
        }

        res.status(201).json({
            message: 'Categoria creada correctamente',
            categoria: nuevaCategoria // Deberías devolver la categoría creada
        });

        return

    } catch (error) {
        res.status(400).json({
            message: 'Error al crear la categoria: ' + error.message,
        });
    }

}

export const actualizarCategoria = async (req, res) => {

    const { categoria } = req.body;

    try {
        
        const renewCategoria = await modelActualizarCategoria( categoria ); // Simulación de actualización

        res.status(200).json({
            message: 'Categoria actualizada correctamente',
            categoria: updatedCategoria // Deberías devolver la categoría actualizada
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

        const result = await modelEliminarCategoria( id );

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