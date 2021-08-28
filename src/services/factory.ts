import web3 from './web3';
import CampaignFactory from '../../ethereum/build/CampaignFactory.json';

// @ts-ignore
const instance = new web3.eth.Contract(JSON.parse(CampaignFactory).abi, '0x9C0f2B23Cb7EC700605433B2aFa9EDd0b6881390');

export default instance;
