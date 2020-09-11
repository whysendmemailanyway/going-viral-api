const express = require('express');
const GamesService = require('./games-service');

const GamesRouter = express.Router();

GamesRouter
    .get('/', (req, res) => {
        let allGames = GamesService.getAllGames();
        res.json(allGames);
    })
    .post('/', (req, res) => {
        const { creatorName } = req.body;
        let game = GamesService.createGame(creatorName);
        res.status(201).json(game);
    })
    .post('/:gameId', (req, res) => {
        const { gameId } = req.params;
        const { playerName } = req.body;
        try {
            let game = GamesService.joinGame(gameId, playerName);
            res.status(200).json(game);
        } catch (e) {
            res.status(500).json(e);
        }
    });

module.exports = GamesRouter;