const Game = require("./game-instance");

let games = [];
const generateGameId = (creatorName) => {
    return `${creatorName}-${Date.now()}`
};
const serializeGame = (game) => {
    return {
        id: game.id,
        leader: game.leader ? game.leader.name : undefined
    }
}

const GamesService = {
    getAllGames() {
        return games.map(serializeGame);
    },
    createGame(creatorName) {
        let newGame = new Game(generateGameId(creatorName));
        newGame.addPlayer(creatorName);
        games.push(newGame);
        return serializeGame(newGame);
    }
}

module.exports = GamesService;