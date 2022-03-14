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

// mysql.createConnection(
//   {
//     host: "localhost",
//     // MySQL username,
//     user: process.env.DB_USER,
//     // MySQL password
//     password: process.env.DB_PW,
//     database: "ecommerce_db",
//   },
//   console.log(`Connected to the ecommerce_db database.`)
// );

// sync sequelize models to the database, then turn on the server

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
});
