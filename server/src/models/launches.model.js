const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  launchDate: new Date("November 2, 2025"),
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  target: "kepler 442b",
  customers: ["SilCorp", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

const isLaunchExist = (id) => {
  return launches.has(id);
};

const getAllLaunches = () => {
  return Array.from(launches.values());
};

const addNewLaunch = (launch) => {
  latestFlightNumber++;
  // launches.set(latestFlightNumber, Object.assign(launch, {
  //   flightNumber: latestFlightNumber,
  //   customer: ["SilCorp", "NASA"],
  //   upcoming: true,
  //   success: true
  // }))
  const newLaunch = {
    ...launch,
    flightDate: new Date(launch.flightDate),
    flightNumber: latestFlightNumber,
    customers: ["SilCorp", "NASA"],
    upcoming: true,
    success: true,
  };
  launches.set(latestFlightNumber, newLaunch);
  return newLaunch;
};

const abortLaunchById = (id) => {
  const launch = launches.get(id);
  const abortedLaunch = { ...launch, upcoming: false, success: false };
  launches.set(id, abortedLaunch);
  return abortedLaunch;
};

module.exports = {
  isLaunchExist,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
