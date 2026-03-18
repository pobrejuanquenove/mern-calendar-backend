const path = require('path')
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();

const app = express();

// DB
dbConnection();

// middlewares
app.use(cors())
// directorio público
app.use(express.static('public'));
// parse del body ... siempre antes de las rutas
app.use(express.json());
// definición de rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// Express 5 introduce breaking changes en la forma en
// que resuelve las rutas.
// Antes: app.use('*', (req, res) => ...)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})