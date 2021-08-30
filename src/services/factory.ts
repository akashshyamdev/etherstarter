import web3 from './web3';
import CampaignFactory from '../../ethereum/build/CampaignFactory.json';

// @ts-ignore
const instance = new web3.eth.Contract(CampaignFactory.abi, '0x4a264f601Ef91961EbB37E3405eE4E6499De7134');

export default instance;
