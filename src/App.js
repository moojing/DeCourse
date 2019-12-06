import React ,{useEffect,useState,useReducer}from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header'
import CourseList from './components/CourseList'
import {askForSettingContractAddress,getContract} from './utils/contract'
import {AppContext} from './context'
import {courseReducer,courseInitialState} from './reducer'
import {ADD_COURSE} from './action/types'
function App() {
  
  let [walletAddress,setWalletAddress] = useState('') 
  let [courseContract,setCourseContract] = useState(null)
  let [showUserModal,setUserModal] = useState(false) 
  const [coursesState,courseDispatch] = useReducer(courseReducer,courseInitialState) 
  
  let addCourse = (course) =>{
    return courseDispatch({
      type:ADD_COURSE, 
      payload:course 
    }) 
  }

  useEffect(()=>{
      setCourseContract(prev=> getContract(askForSettingContractAddress()))
      
      setWalletAddress(prev=> {
          window.ethereum.enable().then(result => { 
          setWalletAddress(result[0] )
      })
    })
    return ()=>{
      
    }
  },[])
  
  let appContextValue = {
    walletAddress,
    courseContract,
    addCourse,
    coursesState,
    setUserModal,
    showUserModal
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
