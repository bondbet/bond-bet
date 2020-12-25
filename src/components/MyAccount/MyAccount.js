import React from 'react'
import PoolBoxHeader from '../Pools/Components/PoolBoxHeader'
import logo from '../../assets/images/onlyLogo.png';
import { useHistory } from 'react-router-dom';
import TransactionsTable from './TransactionsTable';

const MyAccount = () => {
    const history = useHistory();

    return (
        <div className='my-account-section'>
            <h1 className='my-account-title'>My account</h1>
            <div className='pools-box'>
                <PoolBoxHeader title='Community Reward Pool' />
                <div className='my-account-pool-box-content'>
                    <div className='my-account-pool-details'>
                        <div className='my-account-pool-details-head'>
                            <h1>Community Reward Pool</h1>
                            <h1>
                                <img src={logo} alt='Bond Logo' /> Bond
                            </h1>
                        </div>
                        <div className='my-account-pool-buttons'>
                            <button onClick={() => history.push('/community-reward-pool/details')}>Pool Details</button>
                            <button>Get More Tickets</button>
                            <button>Withdraw</button>
                        </div>
                    </div>
                    <div className='my-account-stats'>
                        <div>10 Tickets / BOND</div>
                        <div>Current week prize 2000 BOND</div>
                        <div>Odds 1 in 50,6443234</div>
                        <div>3 winners</div>
                        <div>Prize in 01d:18h:55m:07s</div>
                    </div>
                </div>
            </div>

            <div className='my-account-totals'>
                <div>
                    <h1 className='my-account-title required-changes'>Total Rewards</h1>
                    <div className='pools-box'>
                        <PoolBoxHeader title='Total Rewards' />
                        <div className='pools-box-content required-changes'>
                            <div className='pools-box-inner required-changes'>
                                <div className='pools-box-screen required-changes'>
                                    <div className='pools-box-screen-inner required-changes'>
                                        13.48 bond
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='my-account-title required-changes'>Total Winnings</h1>
                    <div className='pools-box'>
                        <PoolBoxHeader title='Total Winnings' />
                        <div className='pools-box-content required-changes'>
                            <div className='pools-box-inner required-changes'>
                                <div className='pools-box-screen required-changes'>
                                    <div className='pools-box-screen-inner required-changes'>
                                        3 times
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='transactions'>
                <h1 className='my-account-title'>My Transactions</h1>
                <TransactionsTable />
            </div>
        </div>
    )
}

export default MyAccount;