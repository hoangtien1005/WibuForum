import styles from "./styles.module.scss"
import * as React from "react"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import GridContainer from "../ui/GridContainer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Blog from "../Post/Post"
import NewPostDialog from "../NewPostDialog/NewPostDialog"
import Button from "../ui/Button"
const BlogPage = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
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
            <Blog></Blog>
            <Blog></Blog>
            <Blog></Blog>
            <Blog></Blog>
          </List>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.titleBar}>
            <Typography className={styles.title}>
              Release Discussion Posts
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography className={styles.viewAllBtn}>View All</Typography>
          </div>
        </Grid>
        <Grid item className={styles.paddingTopNone} xs={12}>
          <List sx={{ width: "100%" }}>
            <Blog></Blog>
            <Blog></Blog>
            <Blog></Blog>
            <Blog></Blog>
          </List>
        </Grid>
      </GridContainer>
    </>
  )
}

export default BlogPage
