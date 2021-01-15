import React, {useContext} from 'react'
import AppContext from '../../ContextAPI';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';

const ConfirmWithdraw = () => {
    const {
        withdrawAmountRP,
		withdrawAmountSP,
        poolType,
        setModalType,
        setWithdrawAmountRP,
        setWithdrawAmountSP
    } = useContext(AppContext);

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Confirm' />
            <div className='box-content'>
                <div className='box-inner withdraw'>
                    <h1 className='modal-title required-changes'>Confirm withdrawal of tickets</h1>
                    <h4 className='modal-description withdraw'>Amount to be withdrawn: <b>{poolType === 'RP' ? withdrawAmountRP : withdrawAmountSP} tickets/BOND</b></h4>
                    <p className='modal-description-sm withdraw'>Withdrawing everything will make you ineligible to win</p>
                </div>
                <div className='view-leaderboard'>
                    <button onClick={() => { setModalType('WDC'); poolType === 'RP' ? setWithdrawAmountRP('') : setWithdrawAmountSP('') }}>Confirm withdrawal</button>
                </div>
            </div> 
        </div>
    )
}

export default ConfirmWithdraw
