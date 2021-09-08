const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const v1Router = require("./routes/v1/api")

const app = express();

// middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../public")));

// api versioning
app.use("/v1", v1Router)

app.get("/*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

module.exports = app;
