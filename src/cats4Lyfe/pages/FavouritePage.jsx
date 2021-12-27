import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import '../css/modal.css'

export const FavouritePage = ({ data, sumTotal, handleRemoveFav }) => {
    const [open, setOpen] = React.useState(false);
    
    return (

        <>
        <button className="button" onClick={() => setOpen(true)}>
            Open modal
        </button>

        <Modal
            open={open}
            onClose={() => setOpen(false)}
            center
            classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
            }}
        >
            <h1>Shopping Basket</h1>
            {data.map((cat, index) => {
                return (
                    <li key={index}>
                        <img className="poster" src={`${cat.url}`} alt="" />
                        <p>{cat.name}</p>
                        <p>£{cat.price}</p>
                        <button onClick={() => handleRemoveFav(index)}>remove from favourites</button>
                    </li>
                )
            })}
            <p>Total price:</p>
            <p>£{sumTotal()}</p>
        </Modal>
        </>
    )
}