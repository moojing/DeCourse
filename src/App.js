import React ,{useEffect,useState,useRef}from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header'
import CourseList from './components/CourseList'
import {getContract} from './utils/contract'
import {AppContext} from './context'
function App() {
  let [walletAddress,setWalletAddress] = useState('') 
  let [courseContract,setCourseContract] = useState(null)
  const isCancelled = React.useRef(false);
  useEffect(()=>{
    window.ethereum.enable().then(result => { 
      
        setWalletAddress(result[0] )
        let contract =  getContract(result[0])
        setCourseContract(contract)
        
        contract.events.CreateCourse().on('data', function(event){
          console.log('event',event); // same results as the optional callback above
        })
      
    })
    return ()=>{
      isCancelled.current=true
    }
  },[])
  
  let appContextValue = {
    walletAddress,
    courseContract
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
