const axios = require("axios");
const Launch = require("./launch.mongo");
const Planet = require("./planet.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_LAUNCH_DATA_URL = "https://api.spacexdata.com/v4/launches/query";

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

async function findLaunch(filter) {
  return await Launch.findOne(filter);
}

async function getSpaceXLaunchData() {
  const resp = await axios.post(SPACEX_LAUNCH_DATA_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  if (resp.status !== 200) {
    throw new Error("Launch data download failed!");
  }
  return resp.data.docs;
}

async function loadLaunchData() {
  const isLoaded = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (isLoaded) {
    console.log("launch data already loaded...");
  } else {
    launchDocs = await getSpaceXLaunchData();
    for (let launch of launchDocs) {
      const customers = launch.payloads.flatMap((item) => item["customers"]);
      const launchData = {
        flightNumber: launch["flight_number"],
        launchDate: new Date(launch["date_local"]),
        mission: launch["name"],
        rocket: launch["rocket"]["name"],
        target: null,
        upcoming: launch["upcoming"],
        success: launch["success"],
        customers,
      };
      saveLaunch(launchData)
    }
  }
}

async function isLaunchExist(id) {
  return await findLaunch({ flightNumber: id });
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
  return await Launch.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
}

async function addNewLaunch(launch) {
  const planetExist = await Planet.findOne({ keplerName: launch.target });
  if (!planetExist) {
    throw new Error("Planet does not exist");
  }
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
  return aborted.modifiedCount;
}

module.exports = {
  isLaunchExist,
  loadLaunchData,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
