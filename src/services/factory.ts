import web3 from './web3';
import CampaignFactory from '../../ethereum/build/CampaignFactory.json';

// @ts-ignore
const instance = new web3.eth.Contract(CampaignFactory.abi, '0xCC8B387a067271e4AE2e4B6a6e21FDFB8C09e6e2');

export default instance;
