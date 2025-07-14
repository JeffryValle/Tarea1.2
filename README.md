# Tarea1.2
Creación de una API básica para gestión de productos

## 📦 Inicializar proyecto de Node.js
```
npm init -y
```
## 🔧 Instalar Express.js Framework para Node.js
```
npm install express --save
```

## 🔧 Instalar dotenv 
```
npm install dotenv
```
## 🔧 Instalar zod 
```
npm install zod
```
## 🔧 Instalar driver MySQL 
```
npm install mysql2
```
## 🔧 Instalar CORS 
```
npm install cors
```
> [!TIP]
> Por defecto con la versión npm 5.0+, ```npm install``` agrega el módulo a la lista de dependencias
> en el archivo ```package.json```; con nuevas versiones de npm, debes especificar la opción ```--save```
> explicitamente. Esto automaticamente instalará el modulo en la lista de dependencias.
## 🔑 Ejecutar proyecto de Node.js
Para empezar a ejecutar el proyecto de Node.js puedes incorporar en el archivo ```package.json```
dentro del campo ```"scripts"``` la siguiente clave: ```"dev":``` con el siguiente valor ```"node --watch <nombre_archivo_principal>"```.
```js
// Archivo package.json
{
  "name": "<nombre_directorio>",
  "version": "1.0.0",
  "description": "Creación de una API básica para gestión de productos",
  "type": "module",
  "main": "main.js",
  "scripts": {
    "dev": "node --watch <archivo_principal>",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  }
}
```
De esta forma ya puedes empezar a ejecutar el proyecto por medio del siguiente comando: 
```js
npm run dev
```
## 🔥 Rutas
```js

productosRouter.get('/productos', ()=>{})               : Retorna un listado con todos los productos.
productosRouter.get('/productos/:id', ()=>{})           : Retorna la información del producto con el ID especificado.
productosRouter.post('/productos', ()=>{})              : Permite agregar un nuevo producto.
productosRouter.put('/productos/:id', ()=>{})           : Permite modificar los datos de un producto existente.
productosRouter.delete('/productos/:id', ()=>{})        : Elimina un producto con base en su ID.
productosRouter.get('/productos/disponibles', ()=>{})   : Devuelve únicamente los productos que están marcados como disponibles (disponible: true).

categoriasRouter.get('/categorias', ()=>{})               : Lista todas las categorias
categoriasRouter.get('/categorias/:id', ()=>{})           : Obtener categoria por ID
categoriasRouter.post('/categorias', ()=>{})              : Crear una nueva categoria
categoriasRouter.put('/categorias/:id', ()=>{})           : Permite modificar los datos de una categoria existente
categoriasRouter.delete('/categorias/:id', ()=>{})        : Elimina una categoria con base en su ID.
```

## 🔭 Repositorio
```
git clone https://github.com/JeffryValle/Tarea1.2.git
```


