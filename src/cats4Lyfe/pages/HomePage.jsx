import faker from "faker"
// import "../css/index.css"
import React, { useState, useEffect } from "react"
import { ClipLoader } from "react-spinners"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const HomePage = ({ handleAddFavourite, sumTotal, handleRemoveFav, favourites }) => { //passing in handleAddFavourite like this allows us to add items on this page to an array/function which can be accessed by different pages across the website. handleAddFavourite is defined in App.jsx
    // const [favourites, setFavourites] = useState([])
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    //every line of code in HomePage() which isnt a function or state, seems to get run upon every re-render. Having setLoading(true) function like this doesn't work for us since. UPDATE: for useState declarations, it only uses what is in useState one the actual startup/refresh of the page, NOT re-renders.
    const [error, setError] = useState(false)
    const [open, setOpen] = React.useState(false);
    useEffect(() => { //runs on startup and on rerenders
        console.log("useEffect running")
        handleFetch()
    }, [])
    
    const handleFetch = async () => {
        try {
            console.log("handleFetch running")
            const response = await fetch(
                `https://api.thecatapi.com/v1/images/search?limit=5&page=0&order=desc&x-api-key=${process.env.REACT_APP_CAT_KEY}`
            )       
            const responseData = await response.json()
            responseData.map((cat) => {
                cat.price=parseInt(faker.commerce.price(), 0)
                cat.name=(faker.name.firstName())
            })
            setData(responseData)
            setLoading(false) 
            //loading = (!loading) //adding ! before a boolean variable inverts it. This was causing me problems: one seconds running of handleFetch, loading would hang. That's because when handlefetch finsishes running, loading has finished and needs to be set to FALSE in EVERY SCENARIO. Inverting it didn't make sense, since there was never a situation in which handlefetch would finish running and the loading would be considered to have started.
        } catch (error) {
            setError(true)
        }
    }



    return (
        <div>
            <h1>Cat pix</h1>
            <p></p>
            <button className="button" onClick={() => setOpen(true)}>
                Open shopping basket
            </button>
            <button onClick={handleFetch}>Get more catz</button>
            {loading ? (
                <ClipLoader loading={loading} width={150} height={5} />
            ) : ( //removing the loading function breaks the website. I get a data.map is not a function error, and upon refresh, the webpage goes blank and only resets when changing the code. this is a ternary operator
                <ol> 
                    {data &&
                        data.map((cat, index) => {
                            return (
                                <li key={index}>
                                    <img height="500rem" src={cat.url} alt="" />
                                    <p>{cat.name}</p>
                                    <p>£{cat.price}</p>
                                    <button onClick={() => handleAddFavourite(cat)}>add to shopping basket.</button>
                                </li>
                            )
                        })
                    }
                </ol>
            )}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                center
                classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
                }}
            >
                <h1>Shopping basket</h1>
                {favourites.map((cat, index) => {
                    return (
                        <li key={index}>
                            <img className="poster" src={`${cat.url}`} alt="" />
                            <p>{cat.name}</p>
                            <p>£{cat.price}</p>
                            <button onClick={() => handleRemoveFav(index)}>remove from basket</button>
                        </li>
                    )
                })}
                <p>Total price:</p>
                <p>£{sumTotal()}</p>
            </Modal>
        </div>
    )
}

export {HomePage}
