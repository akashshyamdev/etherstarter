import web3 from './web3';
import CampaignFactory from '../../ethereum/build/CampaignFactory.json';

// @ts-ignore
const instance = new web3.eth.Contract(CampaignFactory.abi, '0xc85F2F9F07aa063326a089F4d1288D45b86a77f2');

export default instance;
