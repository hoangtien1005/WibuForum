const userRoute = require("./user.route")
const postRoute = require("./post.route")
const commentRoute = require("./comment.route")
const reactionRoute = require("./reaction.route")
const authRoute = require("./auth.route")
const { tokenAuthenticate } = require("../middlewares/auth.middleware")
function route(app) {
  app.use("/auth", authRoute)
  app.use("/user", userRoute)
  app.use("/post", postRoute)
  app.use("/comment", commentRoute)
  app.use("/reaction", reactionRoute)
  // app.use("/", tokenAuthenticate, userRoute)
}

module.exports = route
