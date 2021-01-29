import React from 'react';
import loading from '../../assets/images/loading.svg';
import './EtherscanLink.css';
import {connect} from 'react-redux';

const EtherscanLink = ({connectedNetwork, txId}) => {
    const link = `https://${connectedNetwork ? connectedNetwork + '.': ""}etherscan.io/tx/${txId}`
    return (
        <div className="etherscanContainer">
                <img src={loading} alt='Loading...' className="etherscanImage"/><br></br><br></br>
              <a href={link} className='etherscanLink' target="_blank">See on Etherscan</a>
           
        </div>
    )
}

const mapStateToProps = ({connectedNetwork}) => ({connectedNetwork})

export default connect(mapStateToProps)(EtherscanLink);