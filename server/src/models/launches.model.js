const launches = new Map()

const launch = {
  flightNumber: 100,
  launchDate: new Date("November 2, 2025"),
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  destination: "kepler 442b",
  customer: ["SilCorp", "NASA"],
  upcoming: true,
  success: true
}

launches.set(launch.flightNumber, launch)

modules.exports = launches;

