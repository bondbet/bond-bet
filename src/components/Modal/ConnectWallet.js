import React, {useContext} from 'react'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader';
import metamask from '../../assets/images/metamask.svg';
import walletConnect from '../../assets/images/wallet-connect.svg';
import ledger from '../../assets/images/ledger.svg';
import trezor from '../../assets/images/trezor.svg';
import coinbase from '../../assets/images/coinbase.svg';
import portis from '../../assets/images/portis.svg';
import AppContext from '../../ContextAPI';

const ConnectWallet = () => {
    const { setOpenModal, setConnected, setWallet } = useContext(AppContext);

    return (
        <div className='pools-box'>
            <PoolBoxHeader title='Connect wallet' />
            <div className='box-content'>
                <div className='box-inner'>
                    <h1 className='modal-title'>Connect Wallet</h1>
                    <h4 className='modal-description'>To start using Bond. Bet No Loss Lottery</h4>
                    <div className='wallets'>
                        <button onClick={() => {setConnected(true); setOpenModal(false); setWallet('MetaMask')}}><img src={metamask} alt='Metamask' /></button>
                        <button onClick={() => {setConnected(true); setOpenModal(false); setWallet('Wallet Connect')}}><img src={walletConnect} alt='Wallet Connect' /></button>
                        <button onClick={() => {setConnected(true); setOpenModal(false); setWallet('Ledger')}}><img src={ledger} alt='Ledger' /></button>
                        <button onClick={() => {setConnected(true); setOpenModal(false); setWallet('Trezor')}}><img src={trezor} alt='Trezor' /></button>
                        <button onClick={() => {setConnected(true); setOpenModal(false); setWallet('Coinbase')}}><img src={coinbase} alt='Coinbase' /></button>
                        <button onClick={() => {setConnected(true); setOpenModal(false); setWallet('Portis')}}><img src={portis} alt='Portis' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectWallet
