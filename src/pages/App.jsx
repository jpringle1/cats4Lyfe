import "../css/index.css"
import { useState } from "react"
import { HomePage } from "./HomePage"


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
            <HomePage handleAddFavourite={handleAddFavourite} handleRemoveFav={handleRemoveFav} sumTotal={sumTotal} favourites={favourites}/>
        </div>
    )
}

export {App}
