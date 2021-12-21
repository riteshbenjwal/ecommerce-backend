const mongoose = require("mongoose");

const connectWithDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Connected to DB"))
    .catch((error) => {
      console.log("Db Connection issues");
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectWithDb;
