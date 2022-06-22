const express = require("express")
const router = express.Router()

const postController = require("../controllers/post.controller")

router.get("/", postController.get)
router.get("/:id", postController.getPostById)
router.put("/:id", postController.update)
router.delete("/:id", postController.destroy)
router.get("/:id/reactions", postController.getReactionByPostId)
router.post("/:id/reactions", postController.createReaction)
router.delete("/:id/reactions", postController.destroyReaction)
router.post("/", postController.create)

module.exports = router
