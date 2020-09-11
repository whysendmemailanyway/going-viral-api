const Game = require("./game-instance");

let games = {};
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
        let id = generateGameId(creatorName);
        let game = new Game(id);
        game.addPlayer(creatorName);
        games[id] = game;
        return serializeGame(game);
    },
    joinGame(gameId, playerName) {
        games[gameId].addPlayer(playerName);
    }
}

module.exports = GamesService;