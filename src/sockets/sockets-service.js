const socketio = require('socket.io');

let listeners = {};
const callListeners = (event, socket, data) => {
    if (listeners[event]) listeners[event].forEach(callback => callback(socket, data));
}

module.exports = {
    ioOnHandler: (socket) => {
        const messageTypes = ['call', 'offer', 'answer'];
        messageTypes.forEach(messageType => {
            socket.on(messageType, (data) => {
                callListeners(messageType, socket, data);
            })
        })
    },
    addListener: (event, callback) => {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(callback);
    },
    send: (socket, event, data) => {
        socket.emit(event, data);
    }
}

// module.exports = class SignalingChannel {
//     constructor(clientId) {
//         this.io = socketio(server, {'origins': '*:*'});
//     }
// }

//module.exports = {
    // SignalingChannel
    // initializeSockets: (server) => {
    //     const io = socketio(server, {'origins': '*:*'});

    //     const handleDisconnect = (client) => {
    //         console.log(`client ${client.id} disconnected`);
    //     }

    //     io.on('connection', (client) => {
    //         console.log(`client ${client.id} connected`);
    //         client.on('disconnect', () => handleDisconnect(client));
    //         let outStream = streamer.createStream();
    //         //let inStream = new MediaStream();
    //         // streamer(client).on('audio-data', (inStream, data) => {
    //         //     console.log(inStream);
    //         //     streamer(client).emit(inStream);
    //         // })
    //         streamer(client).emit('audio-data', outStream);
    //         streamer(client).on('audio-data', (stream, data) => {
    //             console.log(data);
    //             stream.pipe(outStream);
    //         })
    //     });
    // }
// }