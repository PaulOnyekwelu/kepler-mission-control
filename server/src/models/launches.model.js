const Launch = require("./launch.mongo");
const Planet = require("./planet.mongo");

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  launchDate: new Date("November 2, 2025"),
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  target: "Kepler-442 b",
  customers: ["SilCorp", "NASA"],
  upcoming: true,
  success: true,
};
(async function () {
  saveLaunch(launch);
})();

async function isLaunchExist(id) {
  return await Launch.findOne({ flightNumber: id });
}

async function getLatestFlightNumber() {
  const latestLaunch = await Launch.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await Launch.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planetExist = await Planet.findOne({ keplerName: launch.target });
  if (!planetExist) {
    throw new Error("Planet does not exist");
  }
  return await Launch.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
}

async function addNewLaunch(launch) {
  let latestFlightNumber = await getLatestFlightNumber();
  const newLaunch = {
    ...launch,
    flightDate: new Date(launch.flightDate),
    flightNumber: latestFlightNumber + 1,
    customers: ["SilCorp", "NASA"],
    upcoming: true,
    success: true,
  };
  return await saveLaunch(newLaunch);
}

async function abortLaunchById(id) {
  const aborted = await Launch.updateOne(
    { flightNumber: id },
    { success: false, upcoming: false }
  );
  return aborted.modifiedCount
}

module.exports = {
  isLaunchExist,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
