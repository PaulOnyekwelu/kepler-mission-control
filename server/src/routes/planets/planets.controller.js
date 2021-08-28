const { planets } = require("../../models/planets.model");

const getAllPlanets = async (req, res) => {
  return res.json(planets);
};

module.exports = {
  getAllPlanets,
};
