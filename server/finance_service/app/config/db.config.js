const {Pool} = require("pg");
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.USER_CONNECTION,
  host: process.env.HOST_CONNECTION,
  database: process.env.DATABASE_CONNECTION,
  password: process.env.PASSWORD_CONNECTION,
  port: process.env.PORT_CONNECTION,
});

pool.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("postgres connected");
  }
});

module.exports = pool;
