const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }
});

const routerModulo = require('./routerModulo');
const routerBootcamp = require('./routerBootcamp');
const routerNotas = require('./routerNotas');
const routerUsuario = require('./routerUsuario');
const routerSesiones = require('./routerSesiones');
const routerActividades = require('./routerActividades');

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: 'Content-Type',
}));

app.use('/api/modulos', routerModulo);
app.use('/api/bootcamps', routerBootcamp);
app.use('/api/notas', routerNotas)
app.use('/api/usuarios', routerUsuario)
app.use('/api/sesiones', routerSesiones)
app.use('/api/actividades', routerActividades)

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
