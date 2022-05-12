const userModel = require("../models/user.model")
const errorModel = require("../models/error.model")
const { ERROR_CODE } = require("../constants")
const { formatResponseData } = require("../utils")

module.exports = {
  // [GET] /user
  get: async (req, res) => {
    try {
      const { page = 1, perPage = 50 } = req.query

      const { data: documents } = await userModel.get(page, perPage)

      const data = formatResponseData(page, perPage, documents)

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },
  // [GET] /user/:id
  getProfile: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await userModel.getById(id)

      if (!data) return res.json(errorModel(404, "User not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
