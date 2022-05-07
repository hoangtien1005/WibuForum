const express = require("express")
const passport = require("./middlewares/passport.middleware")
const errorHandling = require("./middlewares/errorHandling.middleware")
const cors = require("cors")
const route = require("./routes")
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

passport(app)
route(app)
errorHandling(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
