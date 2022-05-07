const userModel = require("../models/user.model")
const favoriteModel = require("../models/favorite.model")
const postModel = require("../models/post.model")
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
  },
  // [GET] /user/:id/favorites
  getUserFavorite: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await favoriteModel.getFavoriteByUserId(id)

      if (!data) return res.json(errorModel(404, "User not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [POST] /user/:id/favorites
  createUserFavorite: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await favoriteModel.create({ ...req.body, user_id: id })

      if (!data) return res.json(errorModel(404, "User not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [DELETE] /user/:id/favorites/:media_id
  destroyUserFavorite: async (req, res) => {
    try {
      const { id, media_id } = req.params

      await favoriteModel.deleteById(id, media_id)

      return res.json({ data: "Deleted successfully" })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [GET] /user/:id/posts
  getUserPost: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await postModel.getPostByUserId(id)

      if (!data) return res.json(errorModel(404, "User not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [POST] /user/:id/posts
  createUserPost: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await postModel.create({ ...req.body, user_id: id })

      if (!data) return res.json(errorModel(404, "User not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [DELETE] /user/:id/posts/:media_id
  destroyUserPost: async (req, res) => {
    try {
      const { id, media_id } = req.params

      await postModel.deleteById(id, media_id)

      return res.json({ data: "Deleted successfully" })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
