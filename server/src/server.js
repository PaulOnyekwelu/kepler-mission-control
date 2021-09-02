const http = require("http");
const app = require("./app");
const { loadPlanetData } = require("./models/planets.model");
const cluster = require("cluster");
const os = require("os");

(async () => {
  const PORT = process.env.PORT || 8000;
  const server = http.createServer(app);
  await loadPlanetData();

  // console.log(os.cpus().length)

  if (cluster.isMaster) {
    console.log("spanning masters thread...");
    const NUM_WORKERS = os.cpus().length;
    for (let i = 0; i < NUM_WORKERS; i++) {
      cluster.fork();
    }
  } else {
    console.log("spanning worker thread...");
    server.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  }
})();
