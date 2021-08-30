const express = require("express");
const { httpGetAllLaunches, httpAddNewLaunch } = require("./launches.controller");

const launchesRoutes = express.Router();

launchesRoutes.get("/", httpGetAllLaunches);
launchesRoutes.post("/", httpAddNewLaunch)

module.exports = launchesRoutes;
