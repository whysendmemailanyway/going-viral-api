const express = require('express');
const DebugRouter = express.Router();
const { TURN_ADDRESS, TURN_PORT } = require('../config');
const DebugService = require('./debug-service');

DebugRouter
    .get('/', (req, res) => {
        res.send('what do you want from me');
    })
    .post('/', (req, res) => {
        DebugService.createCall(req.body.name);
        res.send('idk yo');
    });

module.exports = DebugRouter;