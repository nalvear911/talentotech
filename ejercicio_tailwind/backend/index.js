const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type',
}));
app.use(express.json());

const modulosRoutes = require('./router'); // Importa el archivo de rutas

app.use('/api/modulos', modulosRoutes); // Utiliza las rutas definidas en router.js

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST','PUT', 'DELETE', 'OPTIONS']
  }
});


server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
