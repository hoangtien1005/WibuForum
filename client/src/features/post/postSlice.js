import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { callServerApi } from "../../utils/callApi"

const initialState = {
  loading: null,
  error: null,
  data: null
}

export const fetchPostById = createAsyncThunk("post", async (post_id) => {
  const initialConfig = {
    endpoint: `post/${post_id}`,
    method: "GET"
  }

  const { data } = await callServerApi(initialConfig)

  const commentConfig = {
    endpoint: `comment?post_id=${post_id}`,
    method: "GET"
  }

  const { data: userData } = await callServerApi({
    endpoint: `user/${data.data.author_id}`,
    method: "GET"
  })
  const { data: commentData } = await callServerApi(commentConfig)

  return { postData: data, userData, commentData }
})

export const createPost = createAsyncThunk("create-post", async (payload) => {
  const config = {
    endpoint: `post`,
    method: "POST",
    payload: payload
  }

  await callServerApi(config)
})

export const createComment = createAsyncThunk(
  "create-comment",
  async (payload) => {
    const config = {
      endpoint: `comment`,
      method: "POST",
      payload: payload
    }

    await callServerApi(config)
  }
)

export const createReaction = createAsyncThunk(
  "create-reaction",
  async (payload) => {
    const config = {
      endpoint: `post/${payload.post_id}/reactions`,
      method: "POST",
      payload: payload
    }

    await callServerApi(config)
  }
)

export const removeReaction = createAsyncThunk(
  "remove-reaction",
  async (payload) => {
    const config = {
      endpoint: `post/${payload.post_id}/reactions`,
      method: "DELETE",
      payload: payload
    }

    await callServerApi(config)
  }
)

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = null
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = null
        state.data = null
        state.error = action.error
      })
  }
})

export const postActions = postSlice.actions
export const selectPost = (state) => state.post
export default postSlice.reducer
