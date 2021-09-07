const { getAllPlanets } = require("../../models/planet.model");

const httpGetAllPlanets = async (req, res) => {
  return res.json(getAllPlanets());
};

module.exports = {
  httpGetAllPlanets,
};
