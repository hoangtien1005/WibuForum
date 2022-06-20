import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { callServerApi } from "../../utils/callApi"

const initialState = {
  loading: null,
  error: null,
  data: null
}

export const fetchPostList = createAsyncThunk("postList", async () => {
  const config = {
    endpoint: "post",
    method: "GET"
  }
  const { data } = await callServerApi(config)

  return { data }
})

const postListSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostList.pending, (state) => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.loading = null
        state.data = action.payload.data
        state.error = null
      })
      .addCase(fetchPostList.rejected, (state, action) => {
        state.loading = null
        state.data = null
        state.error = action.error
      })
  }
})

export const postListActions = postListSlice.actions
export const selectPostList = (state) => state.postList
export default postListSlice.reducer
