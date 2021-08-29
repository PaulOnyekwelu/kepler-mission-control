const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
const planetRouter = require("./routes/planets/planets.routes");

const app = express();

// middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("combined"))
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../public/index.html"));
});
app.use(planetRouter);

module.exports = app;
