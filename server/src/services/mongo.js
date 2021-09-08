const mongoose = require("mongoose");
const chalk = require("chalk");

// connecting to mongoose server
const MONGO_URI =
  "mongodb+srv://Nasa-api-admin:EWnOpH06doalSxnZ@nasacluster.hrue0.mongodb.net/NASA-project?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log(chalk.bgWhite.green("connected succefully to database!"));
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function mongoDisconnect(){
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect
};
