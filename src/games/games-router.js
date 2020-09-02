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
    });

module.exports = GamesRouter;