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


















// server.use('/',function (req, res, next) {

//     res.header('Access-Control-Allow-Origin', '*');

//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     res.header('Access-Control-Allow-Credentials', false);

//     next();
// });