const http = require("http");
const app = require("./app");
const { loadPlanetData } = require("./models/planets.model");
const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose.connection.once("open", () => {
  console.log(chalk.bgWhite.green("connected succefully to database!"))
});


const startServer = async () => {
  const PORT = process.env.PORT || 8000;
  const server = http.createServer(app);

  // connecting to mongoose server
  const MONGO_URI =
    "mongodb+srv://Nasa-api-admin:EWnOpH06doalSxnZ@nasacluster.hrue0.mongodb.net/NASA-project?retryWrites=true&w=majority";
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await loadPlanetData();

  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
};
startServer();
