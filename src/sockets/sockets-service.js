const socketio = require('socket.io');
const server = require('../server');

module.exports = {
    initializeSockets: (server) => {
        const io = socketio(server, {'origins': '*:*'});

        const handleDisconnect = (client) => {
            console.log(`client ${client.id} disconnected`);
        }

        io.on('connection', (client) => {
            console.log(`client ${client.id} connected`);
            client.on('disconnect', () => handleDisconnect(client));
        });
    }
}