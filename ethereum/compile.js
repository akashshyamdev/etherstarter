const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

const input = {
	language: 'Solidity',
	sources: {
		'campaign.sol': {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['campaign.sol'];

(function () {
	try {
		fs.removeSync(buildPath);
		console.log(buildPath, 'removed successfully');
		fs.ensureDirSync(buildPath);
		console.log(buildPath, 'created successfully');

		for (let contract in output) {
			fs.outputJSONSync(path.resolve(buildPath, contract + '.json'), output[contract]);
			console.log(contract, 'contract created successfully');
		}
	} catch (e) {
		console.error(e);
	}
	// EXIT THE PROCESS
	process.exit();
})();
