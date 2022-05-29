import styles from "./styles.module.scss"
import Typography from "@mui/material/Typography"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import Box from "@mui/material/Box"
import { Avatar, IconButton, ListItemAvatar, ListItemText } from "@mui/material"
const Blog = () => {
  return (
    <>
      <div className={styles.listItem}>
        <ListItemAvatar className={styles.listItemAvatar}>
          <Avatar className={styles.avatar} variant="rounded" src="" />
          <Typography className={styles.authorName}>ádasd</Typography>
          <Typography className={styles.time}>19 hours ago</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton className={styles.likeBtn} size="small" disableRipple>
            <FavoriteBorderIcon />
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          className={styles.listItemHeader}
          primary="Brunch this weekend?"
        />
      </div>
    </>
  )
}

export default Blog
