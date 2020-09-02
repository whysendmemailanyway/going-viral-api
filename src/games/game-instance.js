class Player {
    constructor(name) {
        this.name = name;
    }
}

class Game {
    constructor(id) {
        this.players = [];
        this.leader = undefined;
        this.id = id;
    }

    findPlayerByName(name) {
        return this.players.find(player => player.name === name);
    }

    addPlayer(name) {
        if (this.findPlayerByName(name) === undefined) {
            let player = new Player(name);
            if (this.leader === undefined) this.leader = player;
            this.players.push();
        } else {
            throw "Player already exists with that name";
        }
    }

    removePlayer(name) {
        let player = this.findPlayerByName(name);
        if (player) {
            let wasLeader = this.leader === player;
            this.players = this.players.filter(p => p.name === name);
            if (wasLeader) this.leader = this.players[0];
        }
    }
}

module.exports = Game;