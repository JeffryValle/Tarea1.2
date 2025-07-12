import express from 'express';
import cors from 'cors';
import { productosRouter } from './routes/productos.routes.js';
import { categoriasRouter } from './routes/categorias.routes.js';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use('/productos', productosRouter );
app.use('/categorias', categoriasRouter );

app.listen( port, () => console.log(`Servidor escuchando en el puerto ${ port }`) );