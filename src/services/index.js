import Web3 from 'web3';
import { abi as courseABI } from './abi';

export const web3Provider = new Web3(window.ethereum);
 


export const getContract = (address) => new web3Provider.eth.Contract(courseABI, address);

