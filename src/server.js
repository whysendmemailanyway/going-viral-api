require('dotenv').config();
const app = require('./app');
const { PORT, TURN_ADDRESS } = require('./config');
const SocketsService = require('./sockets/sockets-service');
const Turn = require('node-turn');

const turnServer = new Turn({
  authMech: 'none',
  debugLevel: 'ALL',
  listeningIps: [`${TURN_ADDRESS}`]
});

console.log(`Starting Express server...`);

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`Starting TURN server...`);
    turnServer.start();
});

console.log(`Opening sockets...`);

//io(server).on('connection', SocketsService.ioOnHandler);
const io = require('socket.io')(server);
SocketsService.initialize(io);

const exitCallback = (code) => {
    console.log(`About to exit with code: ${code}`);
    console.log(`Stopping TURN server...`);
    turnServer.stop();
    process.exit();
}

process.on('exit', exitCallback);
//catches ctrl+c event
process.on('SIGINT', exitCallback);
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitCallback);
process.on('SIGUSR2', exitCallback);
//catches uncaught exceptions
process.on('uncaughtException', exitCallback);

//SocketsService.initializeSockets(server);