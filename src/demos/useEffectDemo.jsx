import React, { useState, useEffect } from "react"

import "./App.css"

const App = () => {
  const [data, setData] = useState({})
  //   const [covidData, setCovidData] = useState({})
  const [a, setA] = useState("A")

  //   componentDidMount equivilant
  useEffect(() => {
    handleFetch()
  }, [])

  // componentDidUpdate equivilant with specification
  useEffect(() => {
    console.log("the data has changed")
  }, [data])

  //   componentDidUpdate no specific equivilant
  useEffect(() => {
    console.log("the component has updated")
  })

  //   const handleCovidFetch = async () => {
  //     const res = await fetch(`https://covid19-api.com/country?name=${country}&format=json`)
  //     const json = await res.json()
  //     setCovidData(json)
  //   }

  const handleFetch = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
    const responseData = await response.json()
    setData(responseData)
  }

  return (
    <div className="App">
      <h1>Movie DB Popular List</h1>
      <button onClick={handleFetch}>click</button>

      <ol>
        {data.results &&
          data.results.map((movie, index) => {
            return (
              <li key={index}>
                <h4>{movie.original_title}</h4>
                <img className="poster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
              </li>
            )
          })}
      </ol>
    </div>
  )
}

// class App extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       data: "This is my super duper data",
//     }
//   }
//   //   state = {
//   //     data: "This is my super duper data",
//   //   }

//   componentDidMount() {
//     console.log("The component has finished mounting")
//     // this.setState({ data: "This is my NEW data" })
//   }

//   componentDidUpdate() {
//     console.log("the component just updated, woo!")
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>Hello Lifecycle Methods</h1>
//         <p>{this.state.data}</p>
//       </div>
//     )
//   }
// }

export default App
