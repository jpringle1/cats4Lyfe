import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import '../css/modal.css'


const App = () => {
  // import './examples/custom-styling.css';
   

    return (
        <>


        <Modal
            open={open}
            onClose={() => setOpen(false)}
            center
            classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
            }}
        >
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
            </p>
        </Modal>
        </>
    );
};

export {App};