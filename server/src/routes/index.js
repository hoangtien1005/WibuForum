const userRoute = require("./user.route")
const postRoute = require("./post.route")
const commentRoute = require("./comment.route")
const authRoute = require("./auth.route")
const { tokenAuthenticate } = require("../middlewares/auth.middleware")
function route(app) {
  app.use("/auth", authRoute)
  app.use("/user", userRoute)
  app.use("/post", postRoute)
  app.use("/comment", commentRoute)
  // app.use("/", tokenAuthenticate, userRoute)
}

module.exports = route
