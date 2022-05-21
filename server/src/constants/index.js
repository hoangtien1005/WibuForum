require("dotenv").config()
module.exports = {
  SECRET: process.env.SECRET,
  API_URL: process.env.API_URL || "https://localhost:5000",
  ADMIN_ID: 0,
  ERROR_CODE: {
    NO_DATA: 0,
    NOT_EMPTY: 1,
    MULTIPLE: 2
  }
}
