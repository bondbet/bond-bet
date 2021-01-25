import React, {useContext} from 'react';
import loading from '../../assets/images/loading.svg';
import AppContext from '../../ContextAPI';

const EtherscanLink = (props) => {

    const {connectedNetwork} = useContext(AppContext);
    const link = `https://${connectedNetwork ? connectedNetwork + '.': ""}etherscan.io/tx/${props.txId}`
    return (
        <div>
            <a href={link}>See on Etherscan</a>
            <img src={loading} alt='Loading...' />
        </div>
    )
}
export default EtherscanLink;