

import {web3Provider,courseABI} from '../services'
import {parse} from 'query-string'

let contractAddress = parse(window.location.search).address 
if (!contractAddress) {
    contractAddress = prompt("Enter contract address", "0x");
}

export const getContract =  (address) =>  new web3Provider.eth.Contract(courseABI, address);
export let courseContract = getContract(contractAddress); 

export let getCourses = ()=>{
    return courseContract.methods.getCourses().call()
}

export let createCourse = ({title,description,role},options)=>{
    
    return courseContract.methods.createCourse( 
        title,
        description,
        role).send({...options})
}
