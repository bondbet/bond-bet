import React, {useContext} from 'react';
import AppContext from '../../ContextAPI';
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import EtherscanLink from '../Shared/EtherscanLink';
import {connect} from 'react-redux'

const ConfirmDeposit = ({getTicketsLoading, getTicketsTxId}) => {
    const { ticketAmountRP } = useContext(AppContext);

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Confirm deposit' />
            <div className='box-content'>
                <div className='box-inner'>
                {!getTicketsLoading ? 
                <div>
                    <h1 className='modal-title'>Confirm deposit in your wallet</h1>
                    <h4 className='modal-description'>Deposit {ticketAmountRP} BOND for {ticketAmountRP} tickets</h4>
                    <div className='confirm-deposit-loading'> </div>
                 </div>
                        : <div>

                            <h4 className='modal-description'>Depositing...</h4>
                            <EtherscanLink txId={getTicketsTxId}> </EtherscanLink> 

                            
                        </div>

                }
                      
                   
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = ({getTicketsLoading, getTicketsTxId}) => ({getTicketsLoading, getTicketsTxId})
export default connect(mapStateToProps)(ConfirmDeposit)
