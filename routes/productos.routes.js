import { Router } from 'express';
import { 
    actualizarProducto, 
    crearProducto, 
    eliminarProducto, 
    getProductoById, 
    getProductos, 
    getProductosDisponibles 
} from '../controllers/productos.controller.js';

export const productosRouter = Router();

productosRouter.get('/', getProductos );
productosRouter.get('/disponibles', getProductosDisponibles );
productosRouter.get('/:id', getProductoById );
productosRouter.post('/', crearProducto );
productosRouter.put('/:id', actualizarProducto );
productosRouter.delete('/:id', eliminarProducto );