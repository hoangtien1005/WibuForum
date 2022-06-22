const reactionModel = require("../models/reaction.model")
const errorModel = require("../models/error.model")
const { ERROR_CODE } = require("../constants")
const { formatResponseData } = require("../utils")

module.exports = {
  // [GET] /reaction
  get: async (req, res) => {
    try {
      const { page = 1, perPage = 50, post_id, author_id } = req.query

      const { data: documents } = await reactionModel.get(
        page,
        perPage,
        post_id,
        author_id
      )

      const data = formatResponseData(page, perPage, documents)

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [GET] /reaction/:id
  getReactionById: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await reactionModel.getById(id)

      if (!data) return res.json(errorModel(404, "Reaction not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [GET] /reaction?author_id=xx
  getReactionByUserId: async (req, res) => {
    try {
      const { author_id } = req.query

      const { data } = await reactionModel.getReactionByUserId(author_id)

      if (!data) return res.json(errorModel(404, "Reaction not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [GET] /reaction?post_id=xx
  getReactionByPostId: async (req, res) => {
    try {
      const { post_id } = req.query

      const { data } = await reactionModel.getReactionByPostId(post_id)

      if (!data) return res.json(errorModel(404, "Reaction not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [POST] reaction
  create: async (req, res) => {
    try {
      const { data } = await reactionModel.create(req.body)

      if (!data) return res.json(errorModel(404, "Reaction not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [DELETE] reaction/:id
  destroy: async (req, res) => {
    try {
      const { id } = req.params

      await reactionModel.deleteById(id)

      return res.json({ data: "Deleted successfully" })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
