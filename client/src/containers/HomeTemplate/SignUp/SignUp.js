import { Link, useHistory } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { PATHS } from "../../../routes"
import clsx from "clsx"

import styles from "./styles.module.scss"

import Button from "../../../components/ui/Button"
import FormContainer from "../../../components/ui/FormContainer"

import {
  checkUsername,
  checkFullname,
  checkDob,
  checkPassword
} from "../../../utils/utils"
import {
  authActions,
  selectAuth,
  SignUp,
  Login
} from "../../../features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../../../components/Loading"
import Alert from "../../../components/ui/Alert"

const Component = () => {
  const { Reset } = authActions

  const { loading, data, error, success } = useSelector(selectAuth)

  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <>
      {loading && <Loading />}
      {error && <Alert severity="error" message={error.message} />}
      {success && <Alert message="Sign up successfully, redirecting..." />}
      <FormContainer>
        <h1 className={styles.formTitle}>Sign Up Now</h1>
        <Formik
          initialValues={{ username: "", fullname: "", dob: "", password: "" }}
          validate={(values) => {
            const errors = {}
            const usernameError = checkUsername(values.username)
            const fullnameError = checkFullname(values.fullname)
            const dobError = checkDob(values.dob)
            const passwordError = checkPassword(values.password)

            if (usernameError) errors.username = usernameError
            if (fullnameError) errors.fullname = fullnameError
            if (dobError) errors.dob = dobError
            if (passwordError) errors.password = passwordError
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(SignUp(values)).then((res) => {
              if (res.error) {
                setTimeout(() => {
                  dispatch(Reset())
                  setSubmitting(false)
                }, 3000)
              } else if (res.payload) {
                setTimeout(() => {
                  setSubmitting(false)
                  dispatch(Login(values)).then((res) => {
                    history.push("/")
                  })
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
                <label htmlFor="fullname">Full name</label>
                <Field type="text" name="fullname" id="fullname" />
                <ErrorMessage
                  className="error-message"
                  name="fullname"
                  component="div"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="dob">Date of birth</label>
                <Field type="text" name="dob" id="dob" />
                <ErrorMessage
                  className="error-message"
                  name="dob"
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
                Sign Up
              </Button>
              <div className={styles.forgotPassword}>
                <Link to={PATHS.FORGOT_PASSWORD}>Forgot password?</Link>
              </div>
            </Form>
          )}
        </Formik>

        <div className={styles.otherOptionContainer}>
          Already have an account?
          <Link to={PATHS.LOGIN} className={styles.otherOption}>
            Login
          </Link>
        </div>
      </FormContainer>
    </>
  )
}

export default Component
