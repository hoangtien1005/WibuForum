const express = require("express")
const router = express.Router()

const userController = require("../controllers/user.controller")

router.get("/", userController.get)
router.get("/:id", userController.getProfile)
router.get("/:id/favorites", userController.getUserFavorite)
router.post("/:id/favorites", userController.createUserFavorite)
router.delete("/:id/favorites/:media_id", userController.destroyUserFavorite)
router.get("/:id/posts", userController.getUserPost)
router.post("/:id/posts", userController.createUserPost)
router.delete("/:id/posts/:media_id", userController.destroyUserPost)

module.exports = router
