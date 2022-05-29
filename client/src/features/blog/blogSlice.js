// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import { callAnilistApi } from "../../utils/callApi"
// import { generateDate } from "../../utils/utils"
// import { blog_DETAILS_QUERY } from "../../queries/blog"

// const initialState = {
//   loading: null,
//   error: null,
//   data: null
// }

// export const fetchBlogById = createAsyncThunk(
//   "blog",
//   async (blog_id) => {
//     // const res = await callAnilistApi(BLOG_DETAILS_QUERY, {
//     //   id: blog_id
//     // })

//     // const blog = res.data.blog

//     blog.dateOfBirth = generateDate(blog.dateOfBirth)
//     const medias = blog?.media?.edges?.map((media) => media.node)
//     return { data: { person: blog, medias } }
//   }
// )

// const blogSlice = createSlice({
//   name: "blog",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBlogById.pending, (state) => {
//         state.loading = true
//         state.data = null
//         state.error = null
//       })
//       .addCase(fetchBlogById.fulfilled, (state, action) => {
//         state.loading = null
//         state.data = action.payload.data
//         state.error = null
//       })
//       .addCase(fetchBlogById.rejected, (state, action) => {
//         state.loading = null
//         state.data = null
//         state.error = action.error
//       })
//   }
// })

// export const blogActions = blogSlice.actions
// export const selectblog = (state) => state.blog
// export default blogSlice.reducer
