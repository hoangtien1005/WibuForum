const commentModel = require("../models/comment.model")
const errorModel = require("../models/error.model")
const { ERROR_CODE } = require("../constants")
const { formatResponseData } = require("../utils")

module.exports = {
  // [GET] /comment
  get: async (req, res) => {
    try {
      const { page = 1, perPage = 50 } = req.query

      const { data: documents } = await commentModel.get(page, perPage)

      const data = formatResponseData(page, perPage, documents)

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [GET] /comment/:id
  getCommentById: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await commentModel.getById(id)

      if (!data) return res.json(errorModel(404, "Comment not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [GET] /comment?author_id=xx
  getCommentByUserId: async (req, res) => {
    try {
      const { author_id } = req.query

      const { data } = await commentModel.getCommentByUserId(author_id)

      if (!data) return res.json(errorModel(404, "Comment not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [GET] /comment?post_id=xx
  getCommentByPostId: async (req, res) => {
    try {
      const { post_id } = req.query

      const { data } = await commentModel.getCommentByPostId(post_id)

      if (!data) return res.json(errorModel(404, "Post not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [POST] comment
  create: async (req, res) => {
    try {
      const { data } = await commentModel.create(req.body)

      if (!data) return res.json(errorModel(404, "Comment not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [PUT] /comment/:id
  update: async (req, res) => {
    try {
      const { data } = await commentModel.update(req.body)

      if (!data) return res.json(errorModel(404, "Comment not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [DELETE] comment/:id
  destroy: async (req, res) => {
    try {
      const { id } = req.params

      await commentModel.deleteById(id)

      return res.json({ data: "Deleted successfully" })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
