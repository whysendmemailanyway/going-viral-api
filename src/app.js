const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require('./config');
const GamesRouter = require('./games/games-router');

const app = express();
app.use(express.json());

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.use("/api/games", GamesRouter);
app.use("/api/debug", DebugRouter);

app.get("/", (req, res, next) => {
    res.send(`Hi, this is the API! Please check the documentation for more information.`);
});

app.use(function errorHandler(error, req, res, next) {
    console.error(error);
    res.status(500).json(error);
});

module.exports = app;