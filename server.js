const express = require("express");
const routes = require("./routes");
// const mysql = require("mysql2");
const sequelize = require("./config/connection");
require("dotenv").config();

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
});
