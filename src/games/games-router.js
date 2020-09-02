const express = require('express');
const GamesService = require('./games-service');

const GamesRouter = express.Router();

GamesRouter
    .get('/', (req, res) => {
        let allGames = GamesService.getAllGames();
        res.json(allGames);
    })

module.exports = GamesRouter;