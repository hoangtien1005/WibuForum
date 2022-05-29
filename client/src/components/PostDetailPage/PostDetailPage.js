import styles from "./styles.module.scss"
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
import FavoriteIcon from "@mui/icons-material/Favorite"
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"
import Comment from "../Comment/Comment"
import { Button } from "@mui/material"
const BlogPage = ({ title, commentNumber }) => {
  return (
    <>
      <GridContainer spacing={3}>
        <Grid item xs={12}>
          <div className={styles.postTitle}>Title</div>
          <div className={styles.post}>
            <ListItemAvatar className={styles.listItemAvatar}>
              <Avatar className={styles.avatar} variant="rounded" src="" />
              <Typography className={styles.authorName}>ádasd</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography className={styles.time}>9 months ago</Typography>
            </ListItemAvatar>
            <ListItemText
              className={styles.listItemText}
              primary="Brunch this weekend?"
            />

            <div className={styles.postBtn}>
              <Button
                className={styles.commentBtn}
                startIcon={<ChatBubbleIcon />}
                variant="contained"
              >
                Comment
              </Button>
              <Button
                className={styles.heartBtn}
                endIcon={<FavoriteIcon />}
                variant="contained"
              >
                Number of hearts
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.commentTitle}>
            <Typography className={styles.title}>
              {commentNumber} Comment
            </Typography>
          </div>
        </Grid>
        <Grid item className={styles.paddingTopNone} xs={12}>
          <List sx={{ width: "100%" }}>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
          </List>
        </Grid>
      </GridContainer>
    </>
  )
}

export default BlogPage
