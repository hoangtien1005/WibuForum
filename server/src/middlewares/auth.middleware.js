const passport = require("passport")
const errorModel = require("../models/error.model")
module.exports = {
  tokenAuthenticate: (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, data) => {
      if (err || !data) res.json(errorModel(401, "Unauthorized"))
      else next()
    })(req, res, next)
  }
}
