const express = require("express");
const planetRouter = require("./routes/planets/planets.routes");

const app = express();

// middlewares
app.use(express.json())
app.use(planetRouter)


module.exports = app;
