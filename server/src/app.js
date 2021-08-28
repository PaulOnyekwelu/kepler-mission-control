const express = require("express");
const cors = require("cors");
const planetRouter = require("./routes/planets/planets.routes");

const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(planetRouter);

module.exports = app;
