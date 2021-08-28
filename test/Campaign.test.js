const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

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
		await campaign.methods.contribute().send({ from: accounts[1], value: '1000' });

		const isContributor = await campaign.methods.approvers(accounts[1]).call();

		assert(isContributor);
	});

	it('requires a minimum contribution', async () => {
		try {
			await campaign.methods.contribute().send({ from: accounts[1], value: '1' });

			assert(false);
		} catch (err) {
			assert(err);
		}
	});

	it('allows manager to make payment request', async () => {
		let description = 'Buy ';
		let amount = '100';
		let recipient = accounts[1];

		await campaign.methods.createRequest(description, amount, recipient).send({ from: accounts[0], gas: '1000000' });

		const request = await campaign.methods.requests(0).call();

		assert.strictEqual(description, request.description);
		assert.strictEqual(amount, request.value);
		assert.strictEqual(recipient, request.recipient);
	});

	it('processes requests', async () => {
		await campaign.methods.contribute().send({
			from: accounts[0],
			value: web3.utils.toWei('10', 'ether'),
		});

		await campaign.methods
			.createRequest('Buy Inventory', web3.utils.toWei('5', 'ether'), accounts[1])
			.send({ from: accounts[0], gas: '1000000' });

		await campaign.methods.approveRequest(0).send({ from: accounts[0], gas: '1000000' });
		await campaign.methods.finalizeRequest(0).send({ from: accounts[0], gas: '1000000' });

		let balance = await web3.eth.getBalance(accounts[1]);

		balance = parseFloat(web3.utils.fromWei(balance, 'ether'));

		assert(balance > 104);
	});
});
