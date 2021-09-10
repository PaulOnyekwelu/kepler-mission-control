const path = require("path");
const fs = require("fs");
const parse = require("csv-parse");
const Planet = require("./planet.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

async function findPlanet(filter) {
  return await Planet.findOne(filter);
}

async function populatePlanetDB() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "../../data/kepler_data.csv"))
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await insertPlanet(data);
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", async () => {
        const allPlanetsFound = await getAllPlanets();
        console.log(`${allPlanetsFound.length} planets found`);
        resolve();
      });
  });
}

async function loadPlanetData() {
  const isLoaded = await findPlanet({ keplerName: "Kepler-1410 b" });
  if(isLoaded){
    console.log("Planet already loaded")
  }else {
    populatePlanetDB()
  }
}

async function getAllPlanets() {
  // return await Planet.find({}, '-_id -__v'); // does same thing as below
  return await Planet.find({}, { _id: 0, __v: 0 });
}

async function insertPlanet(planet) {
  await Planet.updateOne(
    { keplerName: planet.kepler_name },
    { keplerName: planet.kepler_name },
    { upsert: true }
  );
}

module.exports = {
  loadPlanetData,
  getAllPlanets,
};
