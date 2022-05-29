import styles from "./styles.module.scss"
import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormContainer from "../ui/FormContainer"
import TextareaAutosize from "@mui/material/TextareaAutosize"

const NewPostDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New Post</DialogTitle>
      <DialogContent>
        <Formik initialValues={{ email: "", password: "" }}>
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <Field
                  placeholder="Post Title"
                  type="text"
                  name="postTitle"
                  id="postTitle"
                />
                <ErrorMessage
                  className="error-message"
                  name="postTitle"
                  component="div"
                />
              </div>
              <div className={styles.formGroup}>
                <TextareaAutosize
                  placeholder="Post Content"
                  type="text"
                  minRows={5}
                  name="postContent"
                  id="postContent"
                />
                <ErrorMessage
                  className="error-message"
                  name="postContent"
                  component="div"
                />
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewPostDialog
