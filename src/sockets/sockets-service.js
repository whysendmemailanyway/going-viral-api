let listeners = {};
const callListeners = (event, socket, data) => {
    if (listeners[event]) listeners[event].forEach(callback => callback(socket, data));
}

let sockets = {};

module.exports = {
    initialize: (io) => {
        io.on("connection", socket => {
            console.log(`New connection ${socket.id}`);
            sockets[socket.id] = socket;
            // socket.on("call", data => {
            //     console.log(`New call`);
            //     console.log(data);
            // });
            // socket.on("offer", data => {
            //     console.log(`New offer`);
            //     console.log(data);
            // });
            // socket.on("answer", data => {
            //     console.log(`New answer`);
            //     console.log(data);
            // });
            const messageTypes = ['call', 'offer', 'answer'];
            messageTypes.forEach(messageType => {
                socket.on(messageType, (data) => {
                    callListeners(messageType, socket, data);
                })
            })
            socket.on("disconnect", data => {
                delete sockets[socket.id];
                console.log(`Lost connection ${socket.id}`);
            })
        });
    },
    ioOnHandler: (socket) => {
        console.log("Got new connection");
        // const messageTypes = ['call', 'offer', 'answer'];
        // messageTypes.forEach(messageType => {
        //     socket.on(messageType, (data) => {
        //         console.log(messageType);
        //         listeners[event] ? console.log(listeners[messageType].length) : console.log("NONE");
        //         callListeners(messageType, socket, data);
        //     })
        // })
    },
    addListener: (event, callback) => {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(callback);
    },
    send: (socket, event, data) => {
        socket.emit(event, data);
    },
    getSockets: () => {
        return sockets;
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