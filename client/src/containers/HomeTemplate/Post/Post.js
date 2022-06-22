import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import Loading from "../../../components/Loading"
import LoadingDetailsPage from "../../../components/LoadingDetailsPage"
import PostDetailPage from "../../../components/PostDetailPage"
import ResultNotFound from "../../../components/ResultNotFound"
import { fetchPostById, selectPost } from "../../../features/post/postSlice"

const Component = ({}) => {
  const { loading, data, error } = useSelector(selectPost)

  const location = useLocation()
  const { id } = useParams()

  console.log(data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPostById(id))
    window.scrollTo(0, 0)
  }, [dispatch, id])

  return (
    <>
      {loading && (
        <>
          <Loading />
          <LoadingDetailsPage />
        </>
      )}
      {data && <PostDetailPage data={data} />}
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
