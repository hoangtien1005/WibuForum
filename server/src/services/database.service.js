const { db } = require("../config/db.config")
const { ERROR_CODE } = require("../constants")
module.exports = {
  /**
   * General function to query the database
   * @param {string} method - pg-promise methods
   * @param {string} queryString - raw query string
   * @param {Object} args -  arguments of the query string
   * @returns  success: query result, error: the query result error code
   */
  queryDB: async (method, queryString, args) => {
    try {
      const data = await db[method](queryString, args)
      return { data }
    } catch (err) {
      const isQueryError = Object.values(ERROR_CODE).find(
        (code) => code === err.code
      )

      // error caused by the query result
      if (isQueryError !== undefined) return { error_code: err.code }
      // syntax error, connection error, ...
      else {
        console.log(err)
        throw new Error(err.message)
      }
    }
  }
}
