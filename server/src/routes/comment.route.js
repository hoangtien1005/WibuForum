const express = require("express")
const router = express.Router()

const commentController = require("../controllers/comment.controller")

router.get("/", commentController.get)
router.get("/:id", commentController.getCommentById)
router.get("/user/:id/comments", commentController.getCommentByUserId)
router.get("/post/:id/comments", commentController.getCommentByPostId)
router.post("/", commentController.create)
router.put("/", commentController.update)
router.delete("/", commentController.destroy)

module.exports = router