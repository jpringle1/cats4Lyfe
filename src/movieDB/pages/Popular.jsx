import { useState, useEffect } from "react"
import { ClipLoader } from "react-spinners"

const Pop = ({ handleAddFavourite }) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    handleFetch()
  }, [])

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
      )
      const responseData = await response.json()
      setData(responseData)
      // setTimeout(() => setLoading(!loading), 1000)
      setLoading(!loading)
    } catch (error) {
      setError(true)
    }
  }

  if (error) {
    return <h3>Error: Reload the page</h3>
  }

  return (
    <div>
      <h1>Movie DB</h1>
      {loading ? (
        <ClipLoader loading={loading} width={150} height={5} />
      ) : (
        <ol>
          {data.results &&
            data.results.map((movie, index) => {
              return (
                <li key={index}>
                  <h4>{movie.original_title}</h4>
                  <img className="poster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                  <button onClick={() => handleAddFavourite(movie)}>add to favourites</button>
                </li>
              )
            })}
        </ol>
      )}
    </div>
  )
}

export default Pop
















