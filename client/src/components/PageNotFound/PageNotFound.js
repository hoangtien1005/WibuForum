import styles from "./styles.module.scss"
import Button from "../ui/Button"

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <Button className={styles.btnGoHome} href="/">
        Go Home
      </Button>
    </div>
  )
}
export default PageNotFound
