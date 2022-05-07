require("dotenv").config()
module.exports = {
  SECRET: process.env.SECRET,
  API_URL: process.env.API_URL || "https://localhost:5000",
  ADMIN_ID: 0,
  ROLE: {
    ADMIN: 0,
    USER: 1
  },
  STATE: {
    PUBLIC: "public",
    PRIVATE: "private",
    BLOCKED: "blocked",
    DELETED: "deleted"
  },
  ERROR_CODE: {
    NO_DATA: 0,
    NOT_EMPTY: 1,
    MULTIPLE: 2
  }
}
