const express = require("express")
const router = express.Router()

const postController = require("../controllers/post.controller")

router.get("/", postController.get)
router.get("/:id", postController.getPostById)
router.get("/user/:id/posts", postController.getPostByUserId)
router.post("/", postController.create)
router.put("/", postController.update)
router.delete("/", postController.destroy)

module.exports = router
