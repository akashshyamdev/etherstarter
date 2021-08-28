const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

const cConfig = {
	cColors: {
		green: '\x1b[36m%s\x1b[32m',
		yellow: '\x1b[36m%s\x1b[33m',
		red: '\x1b[36m%s\x1b[31m',
	},
	cUnicodes: {
		check: '✓',
		cross: '⨯',
		ether: '⧫',
	},
	cSpaces: (ns) => Array(ns + 1).join(' '),
};

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	const contract = await new web3.eth.Contract(compiledFactory.abi);
	const deploy = await contract.deploy({ data: '0x' + compiledFactory.evm.bytecode.object });

	factory = await deploy.send({ from: accounts[0], gas: '1500000' });

	await factory.methods.createCampaign('100').send({ from: accounts[0], gas: '1500000' });

	[campaignAddress] = await factory.methods.getCampaigns().call();
	campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaigns', () => {
	it('deploys a factory and a campaign', () => {
		assert.ok(factory.options.address);
		assert.ok(campaign.options.address);
	});

	it('caller as campaign manager', async () => {
		const manager = await campaign.methods.manager().call();

		assert.strictEqual(accounts[0], manager);
	});

	it('contribute money as approvers', async () => {
		await campaign.methods.contribute().send({ from: accounts[1], value: '200' });

		const isContributor = await campaign.methods.approvers(accounts[1]).call();

		assert(isContributor);
	});
});
