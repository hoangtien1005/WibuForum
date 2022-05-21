require("dotenv").config()

const pgp = require("pg-promise")()
const conf = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
}

const db = pgp(conf)
module.exports = { db, pgp }
