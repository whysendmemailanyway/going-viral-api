const express = require('express');
const DebugRouter = express.Router();
const { TURN_ADDRESS, TURN_PORT } = require('../config');
const DebugService = require('./debug-service');

DebugRouter
    .get('/', (req, res) => {
        res.send('what do you want from me');
    })
    .post('/', (req, res) => {
        DebugService.createCall(req.body.playerName)
        res.send(DebugService.iceConfiguration);
    })
    // .get('/get-ice-configuration', (req, res) => {
    //     res.status(200).json(DebugService.iceConfiguration);
    // });

module.exports = DebugRouter;