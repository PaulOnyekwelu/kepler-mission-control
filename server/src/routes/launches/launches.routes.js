const express = require("express");
const { httpGetAllLaunches } = require("./launches.controller");

const launchesRoutes = express.Router();

launchesRoutes.get("/launches", httpGetAllLaunches);

module.exports = launchesRoutes;
