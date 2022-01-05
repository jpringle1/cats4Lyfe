import faker from "faker"
import "../css/index.css"
import React, { useState, useEffect } from "react"
import { ClipLoader } from "react-spinners"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "../css/modal.css"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faCircle} from '@fortawesome/free-solid-svg-icons'


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
        {document.body.style.background="#1F1E29"}
    }, [])
    

    const handleFetch = async () => {
        try {
            console.log("handleFetch running")
            const response = await fetch(
                `https://api.thecatapi.com/v1/images/search?limit=12&page=0&order=desc&x-api-key=${process.env.REACT_APP_CAT_KEY}`
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
        <div id="body">
            
            <div id="basketButton" onClick={() => setOpen(true)}>
                <FontAwesomeIcon id="basketIcon" onClick={() => setOpen(true)} icon={faShoppingBasket} color="white" /> 
            </div>

            <h1 >Buy Cats Online</h1>
            <h2>The number 1 choice for online cat purchases</h2>
            <button id="refreshList" onClick={handleFetch}>Refresh cat list</button>
            {loading ? (
                <ClipLoader loading={loading} width={150} height={5} />
            ) : ( //removing the loading function breaks the website. I get a data.map is not a function error, and upon refresh, the webpage goes blank and only resets when changing the code. this is a ternary operator
                <ol class="grid"> 
                    {data &&
                        data.map((cat, index) => {
                            return (
                                <li key={index} className="browseList">
                                    <div>
                                        <img class="img" src={cat.url} alt="" />
                                        <h3>{cat.name}</h3>
                                    </div>
                                    <div>
                                        <h3>£{cat.price}</h3>
                                        <button onClick={() => handleAddFavourite(cat)}>Add To Basket</button>
                                        <div className="bar"></div>
                                    </div>
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
                <div>
                    <h2 className="modalAlign">Shopping basket</h2>
                    <div className="bar"></div>

                    {favourites.map((cat, index) => {
                        return (
                            <li key={index} class="basket" >
                                <div class="basketItem">
                                    <div class="temp3">
                                        <img className="basketImg" src={`${cat.url}`} alt="" />
                                        <div class="temp2">
                                            <p>{cat.name}</p>
                                            <p margin-top="0px">£{cat.price}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleRemoveFav(index)}>Remove</button>
                                </div>
                                <div className="bar"></div>
                            </li>
                        )
                    })}
                    <div class="grid">
                        <p>Total cost:</p>
                        <p>£{sumTotal()}</p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export {HomePage}
