const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const { SECRET } = require("../constants")
const userModel = require("../models/user.model")

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
  // ignoreExpiration: false,
}

module.exports = (app) => {
  passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      const { email, id } = jwt_payload.sub
      const exp = jwt_payload.exp

      try {
        const { data } = await userModel.getById(id)
        if (data) return done(null, data)
        else return done(null, false)
      } catch (error) {
        return done(error, false)
      }
    })
  )

  app.use(passport.initialize())
}
