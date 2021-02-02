import React from 'react';
import backIcon from '../../assets/images/arrowToLeft.svg';
import closeIcon from '../../assets/images/close.svg';
import ConfirmDeposit from './ConfirmDeposit';
import ConfirmWithdraw from './ConfirmWithdraw';
import ConnectWallet from './ConnectWallet';
import DepositComplete from './DepositComplete';
import GetTickets from './GetTickets';
import PrizeAwarded from './PrizeAwarded';
import Withdraw from './Withdraw';
import WithdrawComplete from './WithdrawComplete';
import {connect} from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type';


const Modal = ({ modalType, setModalType, openModal, setOpenModal, connected }) => {
    const modalTypeName = modalType.modalType;
    const poolType = modalType.poolType; 
    const backTo = () => {
        switch (modalTypeName) {
            case 'GT':
                setOpenModal(false);
                break;
            case 'CW':
                setModalType('GT', poolType);
                break;
            case 'CD':
                connected ? setModalType('GT', poolType) : setModalType('CW', poolType);
                break;
            case 'DC':
                setModalType('GT', poolType);
                break;
            case 'PA':
                setOpenModal(false);
                break;
            case 'WD':
                setOpenModal(false);
                break;
            case 'CWD':
                setModalType('WD', poolType);
                break;
            case 'WDC':
                setModalType('CWD', poolType);
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
                {modalTypeName === 'CW' &&
                    <ConnectWallet poolType={poolType}/>
                }
                {modalTypeName === 'GT' &&
                    <GetTickets poolType={poolType}/>
                }
                {modalTypeName === 'CD' &&
                    <ConfirmDeposit poolType={poolType}/>
                }
                {modalTypeName === 'DC' &&
                    <DepositComplete poolType={poolType}/>
                }
                {modalTypeName === 'PA' &&
                    <PrizeAwarded poolType={poolType}/>
                }
                {modalTypeName === 'WD' &&
                    <Withdraw poolType={poolType}/>
                }
                {modalTypeName === 'CWD' &&
                    <ConfirmWithdraw poolType={poolType}/>
                }
                {modalTypeName === 'WDC' &&
                    <WithdrawComplete poolType={poolType}/>
                }
            </div>
        </div>
    )
}
const mapStateToProps =  ({ modalType, openModal, connected }) => ({ modalType, openModal, connected }) ;
const mapDispatchToProps = dispatch => ({
    setModalType: (value, poolType) => dispatch({type: ACTION_TYPE.MODAL_TYPE, value: {modalType: value, poolType}}),
    setOpenModal: value => dispatch({type: ACTION_TYPE.MODAL_OPEN, value})
})
export default connect(mapStateToProps, mapDispatchToProps)(Modal)
