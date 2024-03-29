

import {web3Provider,courseABI} from '../services'
import {parse} from 'query-string'

export let askForSettingContractAddress= ()=>{
    let contractAddress = parse(window.location.search).address 
    if (!contractAddress) {
        contractAddress = prompt("Enter contract address", "0x");
        window.location.replace('/?address=' + contractAddress)
    }
    return contractAddress
}
const contractAddress = askForSettingContractAddress() 

export const getContract =  (address) =>  new web3Provider.eth.Contract(courseABI, address);
export let courseContract = getContract(contractAddress); 

export let getCourses = ()=>{
    return courseContract.methods.getCourses().call()
}

export let getCourseState = (courseId,options)=>{
    return courseContract.methods.getCourseState(courseId).call()
}

export let createCourse = ({title,description,role},options)=>{
    return courseContract.methods.createCourse( 
        title,
        description,
        role).send({...options})
}
export let getStudentsByCourseId = (courseId) => {
    return courseContract.methods.getStudentsByCourseId( 
        courseId
        ).call()
}
export let joinCourse = (courseId,role,options)=>{
    return courseContract.methods.joinCourse( 
        courseId,role
        ).send({...options})
}
export let leaveCourse = (courseId,options)=>{
    return courseContract.methods.leaveCourse( 
        courseId
        ).send({...options})
}

export let getAddressName = (address)=> {
    return courseContract.methods.getAddressName(
        address).call()
} 

export let setAddressName = (address,name,options)=> {
    return courseContract.methods.setAddressName(
        address,name).send({...options})
} 