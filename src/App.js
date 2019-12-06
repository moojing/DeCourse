import React ,{useEffect,useState,useReducer}from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header'
import CourseList from './components/CourseList'
import {getContract} from './utils/contract'
import {AppContext} from './context'
import {courseReducer,courseInitialState} from './reducer'
import {ADD_COURSES} from './action/types'
function App() {
  
  let [walletAddress,setWalletAddress] = useState('') 
  let [courseContract,setCourseContract] = useState(null)

  const [coursesState,courseDispatch] = useReducer(courseReducer,courseInitialState) 
  
  let addCourse = (course) =>{
    return courseDispatch({
      type:ADD_COURSES, 
      payload:course 
    }) 
  }

  useEffect(()=>{
    // window.ethereum.enable().then(result => { 
    //     setWalletAddress(result[0] )
    //     setCourseContract(contract)
    // })
    return ()=>{
      
    }
  },[])
  
  let appContextValue = {
    walletAddress,
    courseContract,
    addCourse,
    coursesState
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
