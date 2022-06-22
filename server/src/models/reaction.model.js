const { pgp } = require("../config/db.config")
const { STATE } = require("../constants")
const { queryDB } = require("../services/database.service")

class ReactionModel {
  table = new pgp.helpers.TableName({ table: "reaction" })
  commentTable = new pgp.helpers.TableName({ table: "comment" })
  postTable = new pgp.helpers.TableName({ table: "post" })

  async get(page = 1, perPage = 50, post_id, author_id) {
    let conditionString = ""

    if (post_id) conditionString = `post_id = $(post_id)`
    if (author_id) conditionString = ` author_id = $(author_id)`

    if (conditionString.length > 0) conditionString = "WHERE " + conditionString

    const queryString = `
      SELECT *, COUNT(*) OVER() as full_count
      FROM $(table)
      ${conditionString}
      ORDER BY id LIMIT $(perPage) OFFSET $(offset)
    `
    const args = {
      table: this.table,
      perPage: Math.max(perPage, 50),
      post_id,
      author_id,
      offset: (page - 1) * perPage
    }
    return await queryDB("any", queryString, args)
  }

  // TODO: get all the comments, tags and likes in this reactions
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

  async getReactionByUserId(id, page = 1, perPage = 50) {
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

  async getReactionByPostId(id, page = 1, perPage = 50) {
    const queryString = `
      SELECT $(table).author_id
      FROM $(postTable) JOIN $(table)
      ON $(postTable).id = $(table).post_id
      WHERE $(postTable).id = $(id)
    `
    const args = {
      table: this.table,
      postTable: this.postTable,
      id: id
    }
    return await queryDB("any", queryString, args)
  }

  async create(reaction) {
    const queryString = `
      INSERT INTO $(table)(author_id, post_id)
      VALUES ($(author_id), $(post_id))
      RETURNING *`
    const args = {
      table: this.table,
      ...reaction
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

  async destroy(author_id, post_id) {
    const queryString = `DELETE FROM $(table) WHERE author_id=$(author_id) AND post_id=$(post_id)`
    const args = {
      table: this.table,
      author_id,
      post_id
    }
    return await queryDB("none", queryString, args)
  }
}

module.exports = new ReactionModel()
