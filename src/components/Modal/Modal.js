import React, {useContext} from 'react';
import backIcon from '../../assets/images/arrowToLeft.svg';
import closeIcon from '../../assets/images/close.svg';
import AppContext from '../../ContextAPI';
import ConfirmDeposit from './ConfirmDeposit';
import ConfirmWithdraw from './ConfirmWithdraw';
import ConnectWallet from './ConnectWallet';
import DepositComplete from './DepositComplete';
import GetTickets from './GetTickets';
import PrizeAwarded from './PrizeAwarded';
import Withdraw from './Withdraw';
import WithdrawComplete from './WithdrawComplete';

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
            case 'WD':
                setOpenModal(false);
                break;
            case 'CWD':
                setModalType('WD');
                break;
            case 'WDC':
                setModalType('CWD');
                break;
            default:
                setOpenModal(false);
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
                {modalType === 'WD' &&
                    <Withdraw />
                }
                {modalType === 'CWD' &&
                    <ConfirmWithdraw />
                }
                {modalType === 'WDC' &&
                    <WithdrawComplete />
                }
            </div>
        </div>
    )
}

export default Modal
