const { pgp } = require("../config/db.config")
const { STATE } = require("../constants")
const { queryDB } = require("../services/database.service")

class PostModel {
  table = new pgp.helpers.TableName({ table: "post" })
  userTable = new pgp.helpers.TableName({ table: "user" })
  reactionTable = new pgp.helpers.TableName({ table: "reaction" })

  async get(page = 1, perPage = 50) {
    const queryString = `
    SELECT $(table).id, author_id, created_at, content, title, username, COUNT(*) OVER() as full_count
      FROM $(table) JOIN $(userTable)
      ON $(table).author_id = $(userTable).id
      ORDER BY $(table).created_at DESC
      LIMIT $(perPage) OFFSET $(offset)
    `
    const args = {
      table: this.table,
      userTable: this.userTable,
      perPage: Math.max(perPage, 50),
      offset: (page - 1) * perPage
    }

    return await queryDB("any", queryString, args)
  }

  // TODO: get all the comments, tags and likes in this posts
  async getById(id) {
    const queryString = `
        SELECT *
        FROM $(table)
        WHERE id = $(id)`
    const args = {
      table: this.table,
      id: id
    }
    return await queryDB("one", queryString, args)
  }

  async getPostByUserId(id, page = 1, perPage = 50) {
    const queryString = `
    SELECT * FROM $(table), COUNT(*) OVER() as full_count
    WHERE author_id = $(id)
    LIMIT $(perPage) OFFSET $(offset)`
    const args = {
      table: this.table,
      id: id,
      perPage: perPage,
      offset: (page - 1) * perPage
    }
    return await queryDB("any", queryString, args)
  }

  async create(post) {
    const queryString = `
      INSERT INTO $(table)(author_id, title, content)
      VALUES ($(author_id), $(title), $(content))
      RETURNING *`
    const args = {
      table: this.table,
      ...post
    }
    return await queryDB("one", queryString, args)
  }

  async deleteById(id) {
    const queryString = `DELETE FROM $(table) WHERE id=$(id)`
    const args = {
      table: this.table,
      id
    }
    return await queryDB("none", queryString, args)
  }

  async update(post) {
    const queryString = `
        UPDATE $(table) SET content = $(content)
        WHERE id = $(id)
        returning *
      `

    const args = {
      table: this.table,
      ...post
    }
    return await queryDB("one", queryString, args)
  }
}

module.exports = new PostModel()
