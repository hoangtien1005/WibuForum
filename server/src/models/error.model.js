/**
 *
 * @param {number} code - http error code
 * @param {string} message - the message for the error
 * @returns standard error response object
 */

module.exports = (code = 500, message = "Something went wrong") => {
  return { error: { code: code, message: message } }
}
