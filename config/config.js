require("dotenv").config();

const { DATABASE, DBHOST, DIALECT } = process.env;

module.exports = {
  development: {
    username: "root",
    password: "",
    database: DATABASE,
    host: DBHOST,
    dialect: DIALECT,
  },
  test: {
    username: "root",
    password: "",
    database: DATABASE,
    host: DBHOST,
    dialect: DIALECT,
  },
  production: {
    username: "root",
    password: "",
    database: DATABASE,
    host: DBHOST,
    dialect: DIALECT,
  },
};
