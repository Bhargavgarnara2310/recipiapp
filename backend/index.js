const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('trainees.json');

const middlewares = jsonServer.defaults();
// const cors = require('cors')

const port = 5000;

server.use(middlewares);

server.use(router);
console.log(port)
server.listen(port);
