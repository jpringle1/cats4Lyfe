import "../css/index.css"
import { useState } from "react"
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

    const sumTotal = () => {
        let tempTotal= 0
        favourites.map((cat) => {
            tempTotal+=cat.price
        })
        return tempTotal
    }

    return (
        <div className="App">
        <Router>
            <Switch>
                {/* <Route path="/favourites">
                    <FavouritePage data={favourites} handleRemoveFav={handleRemoveFav} sumTotal={sumTotal}/>
                </Route> */}
                <Route path="/">
                    <HomePage handleAddFavourite={handleAddFavourite} handleRemoveFav={handleRemoveFav} sumTotal={sumTotal} favourites={favourites}/>
                </Route>
            </Switch>
        </Router>
        </div>
    )
}

export {App}
