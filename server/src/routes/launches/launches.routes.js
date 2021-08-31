const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunchById,
} = require("./launches.controller");

const launchesRoutes = express.Router();

launchesRoutes.get("/", httpGetAllLaunches);
launchesRoutes.post("/", httpAddNewLaunch);
launchesRoutes.delete("/:id", httpAbortLaunchById)

module.exports = launchesRoutes;
