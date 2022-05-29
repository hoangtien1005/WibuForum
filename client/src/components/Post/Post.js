import styles from "./styles.module.scss"
import Typography from "@mui/material/Typography"
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material"
const Blog = () => {
  return (
    <>
      <div className={styles.listItem}>
        <ListItemText
          className={styles.listItemHeader}
          primary="Brunch this weekend?"
          secondary={<>{"I'll be in your neighborhood doing errands this…"}</>}
        />
        <ListItemAvatar className={styles.listItemAvatar}>
          <Avatar
            className={styles.avatar}
            variant="rounded"
            sx={{ width: 24, height: 24 }}
            src=""
          />
          <Typography className={styles.authorName}>ádasd</Typography>
        </ListItemAvatar>
      </div>
    </>
  )
}

export default Blog
