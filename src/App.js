import React ,{useEffect,useState,useReducer}from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header'
import CourseList from './components/CourseList'
import {askForSettingContractAddress,getContract} from './utils/contract'
import {AppContext} from './context'
import {courseReducer,courseInitialState} from './reducer'
import {ADD_COURSE} from './action/types'
import {getAddressName} from './utils/contract'

function App() {
  
  let [walletAddress,setWalletAddress] = useState('') 
  let [courseContract,setCourseContract] = useState(null)
  let [showUserModal,setUserModal] = useState(false) 
  let [showCreateModal,setCreateModal] = useState(false) 
  const [coursesState,courseDispatch] = useReducer(courseReducer,courseInitialState) 
  const [userName, setUserName] = React.useState('')  

  let addCourse = (course) =>{
    console.log('course: ', course);
    return courseDispatch({
      type:ADD_COURSE, 
      payload:course 
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

        const {
            _index: id,
        } = event.returnValues._courseJoinState;

        // dispatch({
        //     type: types.COMPLETE_TODO,
        //     id: Number(id),
        //     completed: true,
        // })
    })
    courseContract.events.SetName().on('data', event=>{
      setUserName(event.returnValues._username)
    })
  },[courseContract,walletAddress])
  
  let appContextValue = {
    walletAddress,
    courseContract,
    addCourse,
    coursesState,
    setUserModal,
    showUserModal,
    setCreateModal,
    showCreateModal,
    userName,
    setUserName
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
