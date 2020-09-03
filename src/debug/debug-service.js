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
        let myPeerConnection = new RTCPeerConnection(iceConfiguration);
        myPeerConnection.createOffer().then(function (offer) {
            return myPeerConnection.setLocalDescription(offer);
        })
            .then(function () {
                sendToServer({
                    name: `{([<THE SERVER>])}`,
                    target: creatorName,
                    type: "audio-offer",
                    sdp: myPeerConnection.localDescription
                });
            })
            .catch(function (reason) {
                // An error occurred, so handle the failure to connect
            });
        return iceConfiguration;
    }
}

module.exports = DebugService;