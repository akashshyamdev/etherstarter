const dotenv = require('dotenv');
const path = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./build/CampaignFactory.json');

dotenv.config({ path: path.resolve(__dirname, '../', '.env') });

const mnemonicPhrase = process.env.MNEMONIC_PHRASE;
const providerUrl = process.env.PROVIDER_URL;

const provider = new HDWalletProvider({
	mnemonic: process.env.PHRASE,
	providerOrUrl: process.env.NODE_ENDPOINT,
});

const web3 = new Web3(provider);

(async () => {
	try {
		const accounts = await web3.eth.getAccounts();

		console.log('Attempting to deploy contract from account: ', accounts[0]);

		const contract = await new web3.eth.Contract(abi);
		const deploy = contract.deploy({ data: '0x' + evm.bytecode.object });
		const campaignFactory = await deploy.send({ from: accounts[0] });

		console.log('Contract deployed at address: ', campaignFactory.options.address);
	} catch (e) {
		console.log('Contract deploy error: ', e);
	}

	// ENDING SCRIPT PROCESS
	process.exit();
})();
