import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import * as React from "react"
import NewPostDialog from "../NewPostDialog/NewPostDialog"
import Post from "../Post/Post"
import Button from "../ui/Button"
import GridContainer from "../ui/GridContainer"
import styles from "./styles.module.scss"

import { createPost } from "../../features/post/postSlice"
import { fetchPostList } from "../../features/postList/postListSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectAuth } from "../../features/auth/authSlice"

const PostPage = ({ data }) => {
  const [open, setOpen] = React.useState(false)

  const dispatch = useDispatch()

  const { data: userData } = useSelector(selectAuth)

  const posts = data.data.documents

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = (values) => {
    console.log(values)
    dispatch(createPost({ ...values, author_id: userData?.user.id }))
    dispatch(fetchPostList())
    setOpen(false)
  }

  return (
    <>
      <GridContainer spacing={3}>
        <Grid item xs={12}>
          <div className={styles.createPostBar}>
            <Box sx={{ flexGrow: 1 }} />
            <Button className={styles.createPostBtn} onClick={handleClickOpen}>
              Create Post
            </Button>
            <NewPostDialog
              open={open}
              handleClose={handleClose}
              handleConfirm={handleConfirm}
            ></NewPostDialog>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.titleBar}>
            <Typography className={styles.title}>
              Recent Active Posts
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography className={styles.viewAllBtn}>View All</Typography>
          </div>
        </Grid>
        <Grid item className={styles.paddingTopNone} xs={12}>
          <List sx={{ width: "100%" }}>
            {posts.map((post) => {
              return <Post key={post.id} {...post} />
            })}
          </List>
        </Grid>
      </GridContainer>
    </>
  )
}

export default PostPage
