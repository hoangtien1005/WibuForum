const { pgp } = require("../config/db.config")
const { STATE } = require("../constants")
const { queryDB } = require("../services/database.service")

class PostModel {
  table = new pgp.helpers.TableName({ table: "post" })

  async get(page = 1, perPage = 50) {
    const queryString = `
      SELECT *, COUNT(*) OVER() as full_count
      FROM $(table)
      ORDER BY id LIMIT $(perPage) OFFSET $(offset)
    `
    const args = {
      table: this.table,
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
      INSERT INTO $(table)(author_id, content)
      VALUES ($(author_id), $(content))
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
