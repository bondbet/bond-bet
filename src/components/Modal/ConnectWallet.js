import React, {useContext} from 'react'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import metamask from '../../assets/images/metamask.svg';
import walletConnect from '../../assets/images/wallet-connect.svg';
import ledger from '../../assets/images/ledger.svg';
import trezor from '../../assets/images/trezor.svg';
import coinbase from '../../assets/images/coinbase.svg';
import portis from '../../assets/images/portis.svg';
import AppContext from '../../ContextAPI';
import {connect} from 'react-redux';
import { ACTION_TYPE } from '../../store/action-type';

const ConnectWallet = ({setOpenModal, setConnected}) => {

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Connect wallet' />
            <div className='box-content'>
                <div className='box-inner'>
                    <h1 className='modal-title'>Connect Wallet</h1>
                    <h4 className='modal-description'>To start using Bond. Bet No Loss Lottery</h4>
                    <div className='wallets'>
                        <button onClick={() => {setConnected(true); setOpenModal(false)}}><img src={metamask} alt='Metamask' /></button>
                        <button onClick={() => {setConnected(true); setOpenModal(false)}}><img src={walletConnect} alt='Wallet Connect' /></button>
                        <button onClick={() => {setConnected(true); setOpenModal(false)}}><img src={ledger} alt='Ledger' /></button>
                        <button onClick={() => {setConnected(true); setOpenModal(false)}}><img src={trezor} alt='Trezor' /></button>
                        <button onClick={() => {setConnected(true); setOpenModal(false)}}><img src={coinbase} alt='Coinbase' /></button>
                        <button onClick={() => {setConnected(true); setOpenModal(false)}}><img src={portis} alt='Portis' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    setOpenModal: value => dispatch({type: ACTION_TYPE.MODAL_OPEN, value}),
    setConnected: value => dispatch({type: ACTION_TYPE.CONNECTED, value})
})
export default connect(null, mapDispatchToProps)(ConnectWallet)
