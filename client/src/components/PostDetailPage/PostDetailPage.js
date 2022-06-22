import ChatBubbleIcon from "@mui/icons-material/ChatBubble"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { Button } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createComment,
  createReaction,
  removeReaction
} from "../../features/post/postSlice"
import { timeSince } from "../../utils/utils"
import Comment from "../Comment/Comment"
import NewCommentDialog from "../NewCommentDialog/NewCommentDialog"
import GridContainer from "../ui/GridContainer"
import styles from "./styles.module.scss"
import { selectAuth } from "../../features/auth/authSlice"

const PostDetailPage = ({ data }) => {
  const { postData, userData, commentData } = data

  const { data: currentUserData } = useSelector(selectAuth)

  const comments = commentData.data.documents

  const commentCount = commentData.data.totalCount

  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)
  const [currentReaction, setCurrentReaction] = useState(
    postData.data.reaction.length
  )
  const [reacted, setReacted] = useState(false)

  useEffect(() => {
    setReacted(
      postData.data.reaction.some(
        (item) => item.author_id === currentUserData?.user.id
      )
    )
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleReact = () => {
    const payload = {
      post_id: postData.data.id,
      author_id: currentUserData?.user.id
    }
    if (reacted) {
      dispatch(removeReaction(payload))
      setReacted(false)
      setCurrentReaction((prevState) => prevState - 1)
    } else {
      dispatch(createReaction(payload))
      setReacted(true)
      setCurrentReaction((prevState) => prevState + 1)
    }
  }

  const handleConfirm = (values) => {
    console.log(values)
    dispatch(
      createComment({
        ...values,
        post_id: postData.data.id,
        author_id: currentUserData?.user.id
      })
    )
    window.location.reload()
    setOpen(false)
  }

  return (
    <>
      <GridContainer spacing={3}>
        <Grid item xs={12}>
          <div className={styles.postTitle}>{postData?.data?.title}</div>
          <div className={styles.post}>
            <ListItemAvatar className={styles.listItemAvatar}>
              <Avatar className={styles.avatar} variant="rounded" src="" />
              <Typography className={styles.authorName}>
                {userData?.data?.username}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography className={styles.time}>
                {timeSince(postData.data.created_at)}
              </Typography>
            </ListItemAvatar>
            <ListItemText
              className={styles.listItemText}
              primary={postData?.data?.content}
            />
            {currentUserData && (
              <div className={styles.postBtn}>
                <Button
                  onClick={handleClickOpen}
                  className={styles.commentBtn}
                  startIcon={<ChatBubbleIcon />}
                  variant="contained"
                >
                  Comment
                </Button>
                <NewCommentDialog
                  open={open}
                  handleClose={handleClose}
                  handleConfirm={handleConfirm}
                />
                <Button
                  onClick={handleReact}
                  className={styles.heartBtn}
                  endIcon={<FavoriteIcon />}
                  variant="contained"
                >
                  {currentReaction}
                </Button>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.commentTitle}>
            <Typography className={styles.title}>
              {commentCount || 0} Comment
            </Typography>
          </div>
        </Grid>
        <Grid item className={styles.paddingTopNone} xs={12}>
          <List sx={{ width: "100%" }}>
            {comments?.length > 0 &&
              comments.map((comment) => {
                return <Comment key={comment.id} {...comment} />
              })}
          </List>
        </Grid>
      </GridContainer>
    </>
  )
}

export default PostDetailPage
