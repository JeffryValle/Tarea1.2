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



app.listen( port, () => console.log(`Servidor escuchando en el puerto ${ port }`) );