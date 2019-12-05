import React ,{useEffect,useState,useContext}from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header'
import CourseList from './components/CourseList'
import {initApp} from './utils'
import {AppContext} from '../context'
function App() {
  let [walletAddress,setWalletAddress] = useState('') 

  useEffect(()=>{
    window.ethereum.enable().then(result => { 
      setWalletAddress(result[0] )
      initApp(result[0])
    })
    
  },[walletAddress])
  
  let appContextValue = {
    walletAddress
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
