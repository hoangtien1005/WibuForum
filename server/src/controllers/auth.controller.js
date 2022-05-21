const userModel = require("../models/user.model")
const errorModel = require("../models/error.model")
const { genPassword, checkPassword, issueJWT } = require("../utils")

module.exports = {
  // [POST] /auth/signup
  signup: async (req, res) => {
    try {
      const { username, password } = req.body

      if (!username || !password)
        return res.json(errorModel(400, "Missing required credentials."))

      const response = await userModel.getByUsername(username)

      if (response.data)
        return res.json(errorModel(400, "User already exists."))

      const hashPassword = await genPassword(password)

      const { data: user } = await userModel.create({
        username,
        password: hashPassword
      })

      const token = issueJWT({ username: user.username, id: user.user_id })

      return res.json({ data: { user, token } })
    } catch (err) {
      return res.json(errorModel())
    }
  },
  // [POST] /auth/login
  login: async (req, res) => {
    try {
      const { username, password } = req.body

      if (!username || !password)
        return res.json(errorModel(400, "Missing required credentials."))

      const { data: user } = await userModel.getByUsername(username)

      if (!user) return res.json(errorModel(400, "User not found."))

      const isValid = await checkPassword(password, user.password)

      if (!isValid) return res.json(errorModel(400, "Invalid credentials."))

      const token = issueJWT({ username: user.username, id: user.user_id })

      return res.json({ data: { user, token } })
    } catch (err) {
      return res.json(errorModel())
    }
  },
  // [POST] /auth/reset-password
  resetPassword: async (req, res) => {
    try {
      const { username, newPassword } = req.body

      if (!username || !newPassword)
        return res.json(errorModel(400, "Missing required credentials."))

      const { data: user } = await userModel.getByUsername(username)

      if (!user) return res.json(errorModel(400, "User not found."))

      const hashPassword = await genPassword(newPassword)

      const { data: updatedUser } = await userModel.update({
        ...user,
        password: hashPassword
      })

      const token = issueJWT({
        username: updatedUser.username,
        id: updatedUser.user_id
      })

      return res.json({ data: { user: updatedUser, token } })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
