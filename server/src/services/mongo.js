const mongoose = require("mongoose");
const chalk = require("chalk");
const keys = require("../config/keys")

mongoose.connection.once("open", () => {
  console.log(chalk.bgWhite.green("connected succefully to database!"));
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(keys.mongoURI, {
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
