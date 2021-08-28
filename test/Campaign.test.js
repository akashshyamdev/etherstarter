import assert from 'assert';
import ganache from 'ganache-cli';
import Web3 from 'web3';

const web3 = new Web3(ganache.provider());

import compiledFactory from '../backend/build/CampaignFactory.json';
import compiledCampaign from '../backend/build/Campaign.json';

let accounts: string[];
let factory: any;
let campaignAddress: string;
let campaign: any;

beforeEach(async () => {
	console.log(JSON.parse(compiledFactory).evm.abi);
	console.log(JSON.parse(compiledCampaign).evm.abi);

	accounts = await web3.eth.getAccounts();

	factory = await new web3.eth.Contract(JSON.parse(compiledFactory).evm.abi)
		.deploy(JSON.parse(compiledFactory).bytecode)
		.send({ from: accounts[0], gas: 1000000 });

	await factory.methods.createCampaign('100').send({ from: accounts[0], gas: 1000000 });

	[campaignAddress] = await factory.methods.getDeployedCampaigns().call();

	campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign).evm.abi, campaignAddress);
});
