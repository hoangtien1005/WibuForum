import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"

import styles from "./styles.module.scss"

import AnimeCardList from "../../../components/AnimeCardList"
import Filters from "../../../components/Filters"
import AnimeNotFound from "../../../components/AnimeNotFound"
import Loading from "../../../components/Loading"
import Pagination from "../../../components/Pagination"

import { selectAnime, fetchAllAnimes } from "../../../features/anime/animeSlice"

const Home = ({}) => {
  const { loading, data, error } = useSelector(selectAnime)

  const location = useLocation()

  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(generateApiParameters(location.search))

    dispatch(fetchAllAnimes(location.search))
    window.scrollTo(0, 0)
  }, [dispatch, location.search])

  return (
    <>
      <Filters />
      {loading && <Loading />}
      {data && data.status_code === 200 && (
        <>
          <AnimeCardList animes={data.data.documents} />
          <Pagination total={data.data.count} />
        </>
      )}
      {data && data.status_code === 404 && (
        <AnimeNotFound message="No Results" />
      )}
      {error && <AnimeNotFound message={error.message} />}
    </>
  )
}
export default Home
