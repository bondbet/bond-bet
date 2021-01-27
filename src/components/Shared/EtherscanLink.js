import React, {useContext} from 'react';
import loading from '../../assets/images/loading.svg';
import AppContext from '../../ContextAPI';
import './EtherscanLink.css';

const EtherscanLink = (props) => {

    const {connectedNetwork} = useContext(AppContext);
    const link = `https://${connectedNetwork ? connectedNetwork + '.': ""}etherscan.io/tx/${props.txId}`
    return (
        <div className="etherscanContainer">

              <a href={link} className='etherscanLink'>See on Etherscan</a>
            <img src={loading} alt='Loading...' className="etherscanImage"/>
        </div>
    )
}
export default EtherscanLink;