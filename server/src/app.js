const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const planetsRouter = require("./routes/planets/planets.routes");
const launchesRouter = require("./routes/launches/launches.routes");

const app = express();

// middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../public")));

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

module.exports = app;
