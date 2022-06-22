import styles from "./styles.module.scss"
import Typography from "@mui/material/Typography"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import Box from "@mui/material/Box"
import { Avatar, IconButton, ListItemAvatar, ListItemText } from "@mui/material"
import { timeSince } from "../../utils/utils"
const Comment = ({ content, created_at, username, reaction }) => {
  return (
    <>
      <div className={styles.listItem}>
        <ListItemAvatar className={styles.listItemAvatar}>
          <Avatar className={styles.avatar} variant="rounded" src="" />
          <Typography className={styles.authorName}>{username}</Typography>
          <Typography className={styles.time}>
            {timeSince(created_at)}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </ListItemAvatar>
        <ListItemText className={styles.listItemHeader} primary={content} />
      </div>
    </>
  )
}

export default Comment
