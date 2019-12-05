

import {getContract} from '../services'
import {parse} from 'query-string'

let contractAddress = parse(window.location.search).address 
if (!contractAddress) {
    contractAddress = prompt("Enter contract address", "0x");
}
let contract = getContract(contractAddress); 


export let getCourses = ()=>{
    return contract.methods.getCourses().call()
}

export let createCourse = (from)=>{
    return contract.methods.createCourse( 
        'The First Course',
        'I am the first student in this course',
        1).send({from})
}
