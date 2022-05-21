const { pgp } = require("../config/db.config")
const { STATE } = require("../constants")
const { queryDB } = require("../services/database.service")

class CommentModel {
  table = new pgp.helpers.TableName({ table: "comment" })

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

  async getCommentByUserId(id, page = 1, perPage = 50) {
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

  async getCommentByPostId(id, page = 1, perPage = 50) {
    const queryString = `
    SELECT * FROM $(table), COUNT(*) OVER() as full_count
    WHERE post_id = $(id)
    LIMIT $(perPage) OFFSET $(offset)`
    const args = {
      table: this.table,
      id: id,
      perPage: perPage,
      offset: (page - 1) * perPage
    }
    return await queryDB("any", queryString, args)
  }

  async create(comment) {
    const queryString = `
      INSERT INTO $(table)(author_id, post_id, content)
      VALUES ($(author_id), $(post_id), $(content))
      RETURNING *`
    const args = {
      table: this.table,
      ...comment
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

  async update(comment) {
    const queryString = `
        UPDATE $(table) SET content = $(content)
        WHERE id = $(id)
        returning *
      `

    const args = {
      table: this.table,
      ...comment
    }
    return await queryDB("one", queryString, args)
  }
}

module.exports = new CommentModel()
