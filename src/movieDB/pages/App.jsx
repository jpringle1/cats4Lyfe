import "../css/App.css"
import { useState } from "react"
import MovieListing from "./Popular"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { NavBar } from "../components/NavBar"
import { HomePage } from "./HomePage"
import { FavouritePage } from "./FavouritePage"


const App = () => {
  const [favourites, setFavourites] = useState([])

  const handleAddFavourite = (item) => {
    setFavourites([...favourites, item])
  }

  const handleRemoveFav = (index) => {
    let temp = [...favourites]
    temp.splice(index, 1)
    setFavourites([...temp])
  }

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/favourites">
            <FavouritePage data={favourites} handleRemoveFav={handleRemoveFav} />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/"> 
          {/* root path must be at bottom. Every page on website becomes this page when at top */}
            <MovieListing handleAddFavourite={handleAddFavourite} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export {App}
