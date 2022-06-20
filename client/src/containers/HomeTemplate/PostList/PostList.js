import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../../../components/Loading"
import LoadingDetailsPage from "../../../components/LoadingDetailsPage"
import PostPage from "../../../components/PostPage"
import ResultNotFound from "../../../components/ResultNotFound"
import {
  fetchPostList,
  selectPostList
} from "../../../features/postList/postListSlice"

const Component = () => {
  const { loading, data, error } = useSelector(selectPostList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPostList())
    window.scrollTo(0, 0)
  }, [dispatch])

  return (
    <>
      {loading && (
        <>
          <Loading />
          <LoadingDetailsPage />
        </>
      )}
      {data && data.data && <PostPage data={data} />}
      {error && (
        <>
          <div style={{ marginTop: "140px" }}></div>
          <ResultNotFound />
        </>
      )}
    </>
  )
}
export default Component
