const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../backend/build/CampaignFactory.json');
const compiledCampaign = require('../backend/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	factory = await new web3.eth.Contract(JSON.parse(compiledFactory).abi)
		.deploy(`0x${JSON.parse(compiledFactory).evm.bytecode.object}`)
		.send({ from: accounts[0], gas: 1000000 });

	await factory.methods.createCampaign('100').send({ from: accounts[0], gas: 1000000 });

	[campaignAddress] = await factory.methods.getDeployedCampaigns().call();

	campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign).abi, campaignAddress);
});

describe('campaign', () => {
	it('deploys a factory and a campaign', () => {
		assert.ok(factory.options.address);
		assert.ok(campaign.options.address);
	});
});
