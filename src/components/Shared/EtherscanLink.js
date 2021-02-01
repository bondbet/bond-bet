import React, {useContext} from 'react';
import loading from '../../assets/images/loading.svg';
import AppContext from '../../ContextAPI';
import './EtherscanLink.css';

const EtherscanLink = (props) => {

    const {connectedNetwork} = useContext(AppContext);
    const link = `https://${connectedNetwork ? connectedNetwork + '.': ""}etherscan.io/tx/${props.txId}`
    return (
        <div className="etherscanContainer">
                <img src={loading} alt='Loading...' className="etherscanImage" /><br></br><br></br>
              <a href={link} className='etherscanLink' target="_blank" rel="noopener noreferrer">See on Etherscan</a>
           
        </div>
    )
}
export default EtherscanLink;