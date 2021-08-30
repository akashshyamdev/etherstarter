import web3 from './web3';
import CampaignFactory from '../../ethereum/build/CampaignFactory.json';

// @ts-ignore
const instance = new web3.eth.Contract(CampaignFactory.abi, '0x6A1F95C44525E2ac6650158c9104266Be9846A67');

export default instance;
