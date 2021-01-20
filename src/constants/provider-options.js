import WalletConnectProvider from '@walletconnect/web3-provider';


export const getProviderOptions = () => {
	const providerOptions = {
	  walletconnect: {
		package: WalletConnectProvider,
		options: {
		  infuraId: "3ee53f30c759434fbee4aec9d1a3da39",
		
		}
	  }
	};
	return providerOptions;
  };
