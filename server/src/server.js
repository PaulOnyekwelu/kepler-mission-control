const http = require("http");
const app = require("./app");
const { loadPlanetData } = require("./models/planets.model");
const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

(async function () {
  await mongoConnect();
  await loadPlanetData();
})();

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
