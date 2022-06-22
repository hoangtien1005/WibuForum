const postModel = require("../models/post.model")
const reactionModel = require("../models/reaction.model")
const errorModel = require("../models/error.model")
const { ERROR_CODE } = require("../constants")
const { formatResponseData } = require("../utils")

module.exports = {
  // [GET] /post
  get: async (req, res) => {
    try {
      const { page = 1, perPage = 50 } = req.query

      const { data: documents } = await postModel.get(page, perPage)

      const data = formatResponseData(page, perPage, documents)

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [GET] /post/:id
  getPostById: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await postModel.getById(id)

      const { data: reactionData } = await reactionModel.getReactionByPostId(id)

      if (!data) return res.json(errorModel(404, "Post not found."))

      return res.json({ data: { ...data, reaction: reactionData } })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [GET] /post?author_id=xx
  getPostByUserId: async (req, res) => {
    try {
      const { author_id } = req.query

      const { data } = await postModel.getPostByUserId(author_id)

      if (!data) return res.json(errorModel(404, "Post not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [GET] /post/:id/reactions
  getReactionByPostId: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await reactionModel.getReactionByPostId(id)

      if (!data) return res.json(errorModel(404, "Post not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [POST] /post/:id/reactions
  createReaction: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await reactionModel.create(req.body)

      if (!data) return res.json(errorModel(404, "Post not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [DELETE] /post/:id/reactions
  destroyReaction: async (req, res) => {
    try {
      const { id } = req.params

      const { author_id } = req.body

      const { data } = await reactionModel.destroy(author_id, id)
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [POST] /post
  create: async (req, res) => {
    try {
      const { data } = await postModel.create(req.body)

      if (!data) return res.json(errorModel(404, "Post not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [PUT] /post/:id
  update: async (req, res) => {
    try {
      const { id } = req.params
      const { data } = await postModel.update({ ...req.body, id })

      if (!data) return res.json(errorModel(404, "Post not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [DELETE] /post/:id
  destroy: async (req, res) => {
    try {
      const { id } = req.params

      await postModel.deleteById(id)

      return res.json({ data: "Deleted successfully" })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
