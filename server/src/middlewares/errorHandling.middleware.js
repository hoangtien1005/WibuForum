const errorModel = require("../models/error.model")
module.exports = (app) => {
  /* Catch 404 and forward to error handling middleware
    path defaults to “/”, will be executed for every request to the app unless handled by existing routes */
  app.use((req, res, next) => {
    res.json(errorModel(404, "Endpoint not found."))
  })

  /* error handling middleware */
  app.use((err, req, res, next) => {
    res.json(errorModel())
  })
}
