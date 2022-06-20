const { pgp } = require("../config/db.config")
const { STATE } = require("../constants")
const { queryDB } = require("../services/database.service")

class UserModel {
  table = new pgp.helpers.TableName({ table: "user" })

  async get(page = 1, perPage = 50) {
    const queryString = `
      SELECT *, COUNT(*) OVER() as full_count
      FROM $(table) WHERE is_admin = 'false'
      ORDER BY id LIMIT $(perPage) OFFSET $(offset)
    `
    const args = {
      table: this.table,
      perPage: Math.max(perPage, 50),
      offset: (page - 1) * perPage
    }
    return await queryDB("any", queryString, args)
  }

  async getById(id) {
    const queryString = `
    SELECT * FROM $(table)
    WHERE id = $(id) AND is_admin = 'false'`
    const args = {
      table: this.table,
      id: id
    }
    return await queryDB("one", queryString, args)
  }

  async getByUsername(username) {
    const queryString = `SELECT * FROM $(table) WHERE username = $(username) AND is_admin = 'false'`
    const args = {
      table: this.table,
      username: username
    }
    return await queryDB("one", queryString, args)
  }

  async create({ username, fullname, dob, password }) {
    const queryString = `
      INSERT into $(table)(username, fullname, dob, password)
      VALUES ($(username), $(fullname), $(dob), $(password))
      RETURNING *`
    const args = {
      table: this.table,
      username,
      fullname,
      dob,
      password
    }
    return await queryDB("one", queryString, args)
  }

  async deleteById(id) {
    const queryString = `DELETE FROM $(table) WHERE user_id=$(id)`
    const args = {
      table: this.table,
      id,
      _deleted: STATE.DELETED
    }
    return await queryDB("none", queryString, args)
  }

  async update(user) {
    const queryString = `
         UPDATE $(table) SET username = $(username), password = $(password),
         fullname = $(fullname), dob = $(dob),
         WHERE user_id = $(user_id)
         RETURNING *
      `

    const args = {
      table: this.table,
      ...user
    }
    return await queryDB("one", queryString, args)
  }
}

module.exports = new UserModel()
