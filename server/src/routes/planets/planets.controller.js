const { getAllPlanets } = require("../../models/planets.model");

const httpGetAllPlanets = async (req, res) => {
  return res.json(getAllPlanets());
};

module.exports = {
  httpGetAllPlanets,
};
