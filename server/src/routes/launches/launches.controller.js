const {
  isLaunchExist,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
} = require("../../models/launches.model");

const httpGetAllLaunches = async (req, res) => {
  return res.status(200).json(await getAllLaunches());
};

async function httpAddNewLaunch(req, res) {
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
    const newLaunch = await addNewLaunch({
      ...launch,
      launchDate,
    });
    return res.status(201).json(newLaunch);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function httpAbortLaunchById(req, res) {
  const id = parseInt(req.params.id);
  const existLaunch = await isLaunchExist(id);
  if (!existLaunch) {
    return res.status(400).json({
      message: "Launch does not exist",
    });
  }
  const aborted = await abortLaunchById(id);
  if (!aborted) {
    return res.status(400).json({ error: "could not abort mission" });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunchById };
