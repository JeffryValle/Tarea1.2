import { Router } from "express";
import { 
    actualizarCategoria, 
    crearCategoria, 
    eliminarCategoria, 
    getCategoriaById, 
    getCategorias 
} from "../controllers/categorias.controller.js";

export const categoriasRouter = Router();

categoriasRouter.get('/', getCategorias);
categoriasRouter.get('/:id', getCategoriaById);
categoriasRouter.post('/', crearCategoria);
categoriasRouter.put('/:id', actualizarCategoria);
categoriasRouter.delete('/:id', eliminarCategoria);