import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { PATHS } from "../../../routes"
import clsx from "clsx"

import styles from "./styles.module.scss"

import Button from "../../../components/ui/Button"
import FormContainer from "../../../components/ui/FormContainer"
import Alert from "../../../components/ui/Alert"

import { checkUsername, checkPassword } from "../../../utils/utils"
import {
  authActions,
  Login,
  selectAuth
} from "../../../features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../../../components/Loading"

const Component = () => {
  const { Reset } = authActions

  const { loading, success, error } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <>
      {loading && <Loading />}
      {error && <Alert severity="error" message={error.message} />}
      {success && <Alert message="Login successfully, redirecting..." />}
      <FormContainer>
        <h1 className={styles.formTitle}>Login</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors = {}
            const usernameError = checkUsername(values.username)
            const passwordError = checkPassword(values.password)
            if (usernameError) errors.username = usernameError
            if (passwordError) errors.password = passwordError
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(Login(values)).then((res) => {
              if (res.error) {
                setTimeout(() => {
                  dispatch(Reset())
                  setSubmitting(false)
                }, 3000)
              } else if (res.payload) {
                setTimeout(() => {
                  setSubmitting(false)
                  history.push("/")
                }, 2000)
              }
            })
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <Field type="text" name="username" id="username" />
                <ErrorMessage
                  className="error-message"
                  name="username"
                  component="div"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" id="password" />
                <ErrorMessage
                  className="error-message"
                  name="password"
                  component="div"
                />
              </div>
              <Button
                className={styles.button}
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </Button>
              <div className={styles.forgotPassword}>
                <Link to={PATHS.FORGOT_PASSWORD}>Forgot password?</Link>
              </div>
            </Form>
          )}
        </Formik>

        <div className={styles.otherOptionContainer}>
          Don't have an account?
          <Link to={PATHS.SIGNUP} className={styles.otherOption}>
            Sign up now
          </Link>
        </div>
      </FormContainer>
    </>
  )
}

export default Component
