import React from 'react';
import backIcon from '../../assets/images/arrowToLeft.png';
import closeIcon from '../../assets/images/close.png';
import ConnectWallet from './ConnectWallet';

const Modal = ({openModal, setOpenModal, setConnected}) => {
    return (
        <div className={`modal ${openModal ? 'open' : ''}`}>
            <div className='modal-header'>
                <button onClick={() => setOpenModal(false)}>
                    <img src={backIcon} alt='Back' /> Back
                </button>
                <button onClick={() => setOpenModal(false)}>
                    Close <img src={closeIcon} alt='Close' />
                </button>
            </div>
            <div className='modal-content'>
                <ConnectWallet setOpenModal={setOpenModal}  setConnected={setConnected} />
            </div>
        </div>
    )
}

export default Modal
