import productos from './local_db/productos.json' with { type: 'json' }; 
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/productos', (req, res) => {
    res.status(200).json(productos);
});

app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    
    if ( isNaN(id) ) {
        return res.status(400).json({ error: 'El id debe ser un número' });
    }

    const producto = productos.find( product => product.id === parseInt(id));
    if ( !producto ) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
});

app.post('/productos', (req, res) => {
    const { id } = req.body;
    const datos = {
        ...req.body,
        fecha_ingreso: new Date().toISOString()
    }

    const existeProducto = productos.find(product => product.id === id);
    if ( existeProducto ) {
        return res.status(400).json({ error: 'El producto ya existe' });
    }

    productos.push( datos );
    res
    .status(201)
    .json({ 
        message: 'Producto creado exitosamente', 
        producto: { datos } 
    });
});



app.listen( port, () => console.log(`Servidor escuchando en el puerto ${ port }`) );