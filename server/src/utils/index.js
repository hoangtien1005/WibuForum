const { SECRET } = require("../constants")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports = {
  /**
   * Generate a hashed string from the input password
   * @param {string} password - password got from input
   * @returns hashed password
   */
  genPassword: async (password) => {
    const genHash = await bcrypt.hash(password, 10).then((res) => res)
    return genHash
  },

  /**
   * Check if 2 passwords are matched
   * @param {string} password -  password got from input
   * @param {string} db_password -  password stored in db
   * @returns if 2 passwords are matched
   */
  checkPassword: async (password, db_password) => {
    const isValid = await bcrypt
      .compare(password, db_password)
      .then((res) => res)
    return isValid
  },

  /**
   * Issue the user's email and id
   * @param {Object} payload - user's email and id
   * @returns {string} user token
   */
  issueJWT: ({ email, id }) => {
    const expiresIn = "30s" // for testing
    // const expiresIn = "1d"

    const payload = {
      sub: { email, id },
      iat: Math.floor(Date.now())
    }

    const signedToken = jwt.sign(payload, SECRET, { expiresIn })

    return signedToken
  },

  /**
   * Format the documents returned from queries
   * @param {number} page - The page to fetch
   * @param {number} perPage - The results count on each page
   * @param {Array} documents - The documents returned from queries
   * @returns {Object|Array} the response object or an empty array
   */
  formatResponseData: (page, perPage, documents) => {
    if (documents.length === 0) return documents

    const data = { page: parseInt(page), perPage: parseInt(perPage) }
    data.totalCount = parseInt(documents[0].full_count)
    data.totalPage = Math.ceil(data.totalCount / perPage)

    data.documents = documents.map((item) => {
      delete item.full_count
      return item
    })
    return data
  }
}
