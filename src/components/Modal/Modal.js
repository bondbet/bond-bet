import React, {useContext} from 'react';
import backIcon from '../../assets/images/arrowToLeft.png';
import closeIcon from '../../assets/images/close.png';
import AppContext from '../../ContextAPI';
import ConfirmDeposit from './ConfirmDeposit';
import ConnectWallet from './ConnectWallet';
import DepositComplete from './DepositComplete';
import GetTickets from './GetTickets';
import PrizeAwarded from './PrizeAwarded';

const Modal = () => {
    const { modalType, setModalType, openModal, setOpenModal, connected } = useContext(AppContext);

    const backTo = () => {
        switch (modalType) {
            case 'GT':
                setOpenModal(false);
                break;
            case 'CW':
                setModalType('GT');
                break;
            case 'CD':
                connected ? setModalType('GT') : setModalType('CW');
                break;
            case 'DC':
                setModalType('GT');
                break;
            case 'PA':
                setOpenModal(false);
                break;
        }
    }

    return (
        <div className={`modal ${openModal ? 'open' : ''}`}>
            <div className='modal-header'>
                <button onClick={backTo}>
                    <img src={backIcon} alt='Back' /> Back
                </button>
                <button onClick={() => setOpenModal(false)}>
                    Close <img src={closeIcon} alt='Close' />
                </button>
            </div>
            <div className='modal-content'>
                {modalType === 'CW' &&
                    <ConnectWallet />
                }
                {modalType === 'GT' &&
                    <GetTickets />
                }
                {modalType === 'CD' &&
                    <ConfirmDeposit />
                }
                {modalType === 'DC' &&
                    <DepositComplete />
                }
                {modalType === 'PA' &&
                    <PrizeAwarded />
                }
            </div>
        </div>
    )
}

export default Modal
