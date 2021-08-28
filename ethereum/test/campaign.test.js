const CampaignFactory = artifacts.require('CampaignFactory');

contract('Campaign', async (accounts) => {
	it('should deploy a contract', async () => {
		const factoryInstance = await CampaignFactory.deployed();

		await factoryInstance.methods.createCampaign('100').send({ from: accounts[0], gas: 1000000 });

		const [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

		const campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign).abi, campaignAddress);

		assert.ok(campaign.options.address);
	});
});
