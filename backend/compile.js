const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

// Clear out the build directory
const buildPath = path.resolve(__dirname, './build');
fs.removeSync(buildPath);

// Read the contract source code
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

// Compile the contract
const input = {
	language: 'Solidity',
	sources: {
		'Campaign.sol': {
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

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);

// Ensure build directory exists
fs.ensureDirSync(buildPath);

// Output JSON files

const campaignContract = output.contracts['Campaign.sol'];

fs.outputJsonSync(path.resolve(buildPath, 'Campaign.json'), JSON.stringify(campaignContract.Campaign));
fs.outputJsonSync(path.resolve(buildPath, 'CampaignFactory.json'), JSON.stringify(campaignContract.CampaignFactory));
