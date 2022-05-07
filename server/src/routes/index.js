const userRoute = require("./user.route")
const categoryRoute = require("./category.route")
const authRoute = require("./auth.route")
const favoriteRoute = require("./favorite.route")
const { tokenAuthenticate } = require("../middlewares/auth.middleware")
function route(app) {
  app.use("/category", categoryRoute)
  app.use("/auth", authRoute)
  app.use("/user", userRoute)
  app.use("/favorites", favoriteRoute)
  // app.use("/", tokenAuthenticate, userRoute)
}

module.exports = route
