import React ,{useEffect,useState,useReducer}from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header'
import CourseList from './components/CourseList'
import {askForSettingContractAddress,getContract} from './utils/contract'
import {AppContext} from './context'
import {courseReducer,courseInitialState} from './reducer'
import {ADD_COURSE,RESET_COURSE,LOAD_COURSE} from './action/types'
import {getAddressName} from './utils/contract'

function App() {
  
  let [walletAddress,setWalletAddress] = useState('') 
  let [courseContract,setCourseContract] = useState(null)
  let [showUserModal,setUserModal] = useState(false) 
  let [showCreateModal,setCreateModal] = useState(false) 
  let [showCourseModal,setCourseModal] = useState(false) 
  const [coursesState,courseDispatch] = useReducer(courseReducer,courseInitialState) 
  const [userName, setUserName] = React.useState('')  
  let [loading,setLoading] = useState(true)
  let addCourse = (course) =>{
    console.log('course: ', course);
    return courseDispatch({
      type:ADD_COURSE, 
      payload:course 
    }) 
  }
  let loadCourse = (courses)=>{
    return courseDispatch({
      type:LOAD_COURSE, 
      payload:courses
    }) 
  }
  let resetCourse = ()=>{
    return courseDispatch({
      type:RESET_COURSE,
      payload:[]
    })
  }

  useEffect(()=>{
      setCourseContract(prev=> getContract(askForSettingContractAddress()))
      
      window.ethereum.enable().then(result => { 
        console.log('result[0]',result[0]) 
        setWalletAddress(result[0])
        // if(!userName){
        //   setUserName(result[0].substring(0,10)+'...')
        // }
      })
    return ()=>{
      
    }
  },[walletAddress])

  useEffect(()=>{
    if(!courseContract || !walletAddress) return ;
    getAddressName(walletAddress).then(res=>{
      console.log('res: ', res);
      
      if(!res){
        setUserName(walletAddress.substring(0,10)+'...')
      }else{
        setUserName(res)
      }
    }) 
    courseContract.events.CreateCourse()
    .on('data', event => {
      console.log('event: ', event.returnValues);
        if (!event) {
            return;
        }

        setLoading(true)
        // addCourse([event.returnValues._courseJoinState])
        
        // })
    })
    courseContract.events.SetName().on('data', event=>{
      console.log('Name_event: ', event);
      setUserName(event.returnValues._username)
    })
  },[courseContract, walletAddress])
  
  let appContextValue = {
    walletAddress,
    courseContract,
    addCourse,
    loadCourse,
    resetCourse,
    coursesState,
    setUserModal,
    showUserModal,
    setCreateModal,
    showCreateModal,
    setCourseModal,
    showCourseModal,
    userName,
    setUserName,
    setLoading,
    loading
  }
  return (
    <AppContext.Provider value={appContextValue}>
    <div className="App">
      <Header/>
      <CourseList/>
    </div>
    </AppContext.Provider>
  );
}

export default App;
