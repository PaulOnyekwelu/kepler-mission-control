const http = require("http");
const app = require("./app");
const { loadPlanetData } = require("./models/planets.model");

(async () => {
  const PORT = process.env.PORT || 8000;
  const server = http.createServer(app);
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
})();
