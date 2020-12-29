import React, {useContext} from 'react'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import metamask from '../../assets/images/metamask.png';
import walletConnect from '../../assets/images/wallet-connect.png';
import ledger from '../../assets/images/ledger.png';
import trezor from '../../assets/images/trezor.png';
import coinbase from '../../assets/images/coinbase.png';
import portis from '../../assets/images/portis.png';
import AppContext from '../../ContextAPI';

const ConnectWallet = () => {
    const { setOpenModal, setConnected } = useContext(AppContext);

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

export default ConnectWallet
