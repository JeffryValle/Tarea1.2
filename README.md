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
> [!TIP]
> Por defecto con la versión npm 5.0+, ```npm install``` agrega el módulo a la lista de dependencias
> en el archivo ```package.json```; con nuevas versiones de npm, debes especificar la opción ```--save```
> explicitamente. Esto automaticamente instalará el modulo en la lista de dependencias.
## 🔑 Ejecutar proyecto de Node.js
Para empezar a ejecutar el proyecto de Node.js puedes incorporar en el archivo ```package.json```
dentro del campo ```"scripts"``` la siguiente clave: ```"dev":``` con el siguiente valor ```"node --watch <nombre_archivo_principal>"```.
```ruby
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
```ruby
npm run dev
```
## 🔭 Repositorio
```
git clone https://github.com/JeffryValle/Tarea1.2.git
```




