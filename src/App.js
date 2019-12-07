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
  let [showCreateModal,setCreateModal] = useState(false) 
  const [coursesState,courseDispatch] = useReducer(courseReducer,courseInitialState) 
  
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
      })
    return ()=>{
      
    }
  },[])

  useEffect(()=>{
    if(!courseContract) return ;
    courseContract.events.CreateCourse()
    .on('data', event => {
      console.log('event: ', event);
        if (!event) {
            return;
        }

        // const {
        //     _index: id,
        // } = event.returnValues;

        // dispatch({
        //     type: types.COMPLETE_TODO,
        //     id: Number(id),
        //     completed: true,
        // })
    })
  },[courseContract])
  
  let appContextValue = {
    walletAddress,
    courseContract,
    addCourse,
    coursesState,
    setUserModal,
    showUserModal,
    setCreateModal,
    showCreateModal,
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
