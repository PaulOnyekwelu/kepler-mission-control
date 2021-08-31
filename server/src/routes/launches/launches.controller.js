const {
  isLaunchExist,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
} = require("../../models/launches.model");

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

const httpAddNewLaunch = (req, res) => {
  try {
    const launch = req.body;
    if (
      !launch.launchDate ||
      !launch.mission ||
      !launch.rocket ||
      !launch.target
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    const launchDate = new Date(launch.launchDate);
    if (isNaN(launchDate)) {
      return res.status(400).json({
        error: "invalid date",
      });
    }
    const newLaunch = addNewLaunch({
      ...launch,
      launchDate,
    });
    return res.status(201).json(newLaunch);
  } catch (error) {
    console.log(error);
  }
};

const httpAbortLaunchById = (req, res) => {
  const id = parseInt(req.params.id);
  if (!isLaunchExist(id)) {
    return res.status(400).json({
      message: "Launch does not exist",
    });
  }
  const aborted = abortLaunchById(id);
  return res.status(200).json(aborted);
};

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunchById };
