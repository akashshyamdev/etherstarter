import web3 from './web3';
import CampaignFactory from '../../ethereum/build/CampaignFactory.json';

// @ts-ignore
const instance = new web3.eth.Contract(JSON.parse(CampaignFactory).abi, '0xD4AA8ff9e18b97074EBDE1D45e613ce8a9F29854');

export default instance;
