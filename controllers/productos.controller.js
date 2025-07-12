import productos from '../local_db/productos.json' with { type: 'json' };

//? Obtener todos los productos
export const getProductos = (req, res) => {
    res.status(200).json(productos); 
}

//? Obtener los productos que esten disponibles
export const getProductosDisponibles = (req, res) => {
    const productosDisponibles = productos.filter( producto => producto.disponible === true);

    if ( productosDisponibles.length === 0 ) { 
        return res.status(404).json({ error: 'No hay productos disponibles' }); 
    }

    return res.status(200).json( productosDisponibles );
}


//? Obtener un producto por su id
export const getProductoById = (req, res) => {
    const { id } = req.params;
    
    if ( isNaN(id) ) { return res.status(400).json({ error: 'El id debe ser un número' }); }

    const producto = productos.find( product => product.id === parseInt(id));

    if ( !producto ) { return res.status(404).json({ error: 'Producto no encontrado' }); }

    res.status(200).json(producto);
}


//? Crear un producto
export const crearProducto = (req, res) => {
    const { id, nombre, precio, descripcion, disponible } = req.body;
    const datos = {
        ...req.body,
        fecha_ingreso: new Date().toISOString()
    }

    const existeProducto = productos.find(product => product.id === id);
    if ( existeProducto ) {
        return res.status(400).json({ error: 'El producto ya existe' });
    }
    if ( typeof nombre !== 'string' || !nombre || nombre.length <= 4 ) {
        return res.status(400).json({ error: 'El nombre del producto debe tener al menos 4 caracteres' });
    }
    if ( typeof precio !== 'number' || isNaN(precio) || precio <= 0 ) {
        return res.status(400).json({ error: 'El precio del producto debe ser un número mayor a 0' });
    }
    if ( typeof descripcion !== 'string' || descripcion.length <= 10 || descripcion.length > 200 ) {
        return res.status(400).json({ error: 'La descripción del producto debe tener entre 10 y 200 caracteres' });
    }
    if ( typeof disponible !== 'boolean' ) {
        return res.status(400).json({ error: 'El campo "disponible" debe ser un true o false' });
    }

    productos.push( datos );
    res
    .status(201)
    .json({ 
        message: 'Producto creado exitosamente', 
        producto: { datos } 
    });
}


//? Actualizar un producto
export const actualizarProducto = (req, res) => {
    const { id } = req.params
    const parsedId = Number(id)

    if ( isNaN(parsedId) ) { return res.status(400).json({ message: 'El id no existe'}) }

    const data = req.body 
    const index = productos.findIndex((producto) => producto.id == parsedId)
    if (index === -1) { res.status(400).json({ message: 'El producto no existe' }) }

    const producto = { id: parsedId, ...data }
    productos[index] = producto

    res.json({ message: 'Producto actualizado exitosamente', producto })
    console.log(`Producto actualizado: ${JSON.stringify(producto)}`);
}


//? Eliminar un producto
export const eliminarProducto = (req, res) => {
    const { id } = req.params;
    
    if ( isNaN(id) ) { return res.status(400).json({ error: 'El id debe ser un número' }); }

    const producto = productos.find( product => product.id === parseInt(id));

    if ( !producto ) { return res.status(404).json({ error: 'Producto no encontrado' }); }

    productos.splice(productos.indexOf(producto), 1);

    res.status(200).json(  { message: 'Producto eliminado exitosamente', producto  } );
    console.log(`Producto eliminado: ${JSON.stringify(producto)}`);
}