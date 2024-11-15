const express = require('express');
const morgan = require ("morgan");

//Configuración inicial 
const app = express();
const port = 5000;
app.get('/', (req, res) => {
  res.send('¡Hola Mundo! El servidor Express está funcionando.');
});
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


//Middlewares
app.use(morgan)

//Routes
app.get("/productos", (req,res) => {res.json()})