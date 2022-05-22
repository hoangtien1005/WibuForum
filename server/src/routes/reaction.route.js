const express = require("express")
const router = express.Router()

const reactionController = require("../controllers/reaction.controller")

router.get("/", reactionController.get)
router.get("/:id", reactionController.getReactionById)
router.get("/user/:id/reactions", reactionController.getReactionByUserId)
router.get("/post/:id/reactions", reactionController.getReactionByPostId)
router.post("/", reactionController.create)
router.delete("/:id", reactionController.destroy)

module.exports = router
