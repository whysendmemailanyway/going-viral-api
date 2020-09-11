const { TURN_PORT, TURN_ADDRESS } = require('../config');

const SocketsService = require('../sockets/sockets-service');

let calls = {};

const iceConfiguration = {
    iceServers: [
        {
            urls: `turn:${TURN_ADDRESS}:${TURN_PORT}`,
            // username: 'optional-username',
            // credentials: 'auth-token'
        }
    ]
};

class Call {
    constructor(channelId) {
        this.channelId = channelId;
        this.serverCon = new RTCPeerConnection(iceConfiguration);
        this.clientCon = new RTCPeerConnection(iceConfiguration);
        this.serverCon.onicecandidate = e => this.onIceCandidate(`serverCon`, this.clientCon, e);
        this.clientCon.onicecandidate = e => this.onIceCandidate(`clientCon`, this.serverCon, e);
    }

    initializeCon = (conKey) => {
        let newCon;
        newCon
        this[conKey] = newCon;
    }

    onIceCandidate = (connectionKey, peerConnection, event) => {
        let connection = this[connectionKey];
        peerConnection.addIceCandidate(event.candidate)
            .then(
                () => onAddIceCandidateSuccess(connection),
                err => onAddIceCandidateError(connection, err)
            );
        console.log(`${connectionKey} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
    }
}

const generateChannelId = (creatorName) => {
    return `${creatorName}-${Date.now()}`;
};

const DebugService = {
    // getAllCalls() {
    //     return calls;
    // },
    createCall(creatorName) {
        let channelId = generateChannelId(creatorName);
        console.log(`Starting call on channel ${channelId}`);
        let peerConnection = new RTCPeerConnection(iceConfiguration);
        // Exchange RTC session descriptions
        SocketsService.addListener('call', (socket, data) => {
            peerConnection.createOffer().then((offer) => {
                console.log("Created offer");
                myPeerConnection.setLocalDescription(offer)
                .then(() => {
                    console.log("Set local description to new offer.");
                    SocketsService.send(socket, 'offer', {offer, configuration: iceConfiguration});
                })
            })
        });

        SocketsService.addListener('answer', (socket, data) => {
            peerConnection.setRemoteDescription(new RTCSessionDescription(data.rtcSessionDescription));
        })

        // Listen for remote ICE candidates and add them to the local RTCPeerConnection
        SocketsService.addEventListener('new-ice-candidate', data => {
            if (data.iceCandidate) {
                try {
                    peerConnection.addIceCandidate(data.iceCandidate)
                    .then(() => {
                        console.log("Added ice candidate!");
                    });
                } catch (e) {
                    console.error('Error adding received ice candidate', e);
                }
            }
        });

        // Listen for connectionstatechange on the local RTCPeerConnection
        peerConnection.addEventListener('connectionstatechange', event => {
            if (peerConnection.connectionState === 'connected') {
                console.log("Peers connected!");
                const remoteStream = MediaStream();
                peerConnection.addEventListener('track', (event) => {
                    remoteStream.addTrack(event.track, remoteStream);
                });
                console.log(peerConnection);
                console.log(peerConnection.getReceivers());
                peerConnection.getReceivers().forEach(receiver => {
                    peerConnection.addTrack(receiver.track, localStream);
                });
            }
        });
    }
}

module.exports = DebugService;