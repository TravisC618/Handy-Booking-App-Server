const mongoose = require("mongoose");

exports.connectToDB = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

  let connectionString;
  // or. process.env.NODE_ENV === "production"
  if (DB_USER && DB_PASSWORD) {
    connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
  } else {
    connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  }
  return mongoose.connect(connectionString);
};
