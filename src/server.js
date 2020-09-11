const app = require('./app');
const { PORT } = require('./config');
const SocketsService = require('./sockets/sockets-service');
// const Turn = require('node-turn');

// const turnServer = new Turn({
//   authMech: 'none',
//   debugLevel: 'ALL',
//   listeningIps: ['127.0.0.1']
// });

console.log(`Starting Express server...`);
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    // console.log(`Starting TURN server...`);
    // turnServer.start();
});

const exitCallback = (code) => {
    console.log(`About to exit with code: ${code}`);
    // console.log(`Stopping TURN server...`);
    // turnServer.stop();
}

process.on('exit', exitCallback);
//catches ctrl+c event
process.on('SIGINT', exitCallback);
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitCallback);
process.on('SIGUSR2', exitCallback);
//catches uncaught exceptions
process.on('uncaughtException', exitCallback);

SocketsService.initializeSockets(server);