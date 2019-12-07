import React,{useContext, useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar';
import {Button,Menu,MenuItem} from '@material-ui/core';

import web3 from 'web3';
import * as S from './Header.styled'
import {AppContext} from '../context/index'


let Header = ()=>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {walletAddress,
         courseContract,
         userName,
         setUserModal,
         setCreateModal}  = useContext(AppContext)
  
  useEffect(()=>{
    if(courseContract&&walletAddress){
      console.log('courseContract: ', courseContract);
     
    }
  },[courseContract, walletAddress])

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onCreateClick = () => {
    setCreateModal(true)
    handleClose()
  }
   
  const onInfoClick = async ()=>{
    setUserModal(true)
    handleClose()
    // let courseData = {
    //   title: 'BlockChain 101', 
    //   description:"let's learn blockchain!!",
    //   role:1
    // }
    // await createCourse(courseData,{from:walletAddress,value:web3.utils.toWei('1', 'ether')})
    // let courses = await getCourses()
  }
  
    return (
        <AppBar position="static">
        <S.Toolbar>
          <S.Typography variant="h6" >
            DeCourse
          </S.Typography>
          
        <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClick}
            color="inherit">
           {userName?`Hi,${userName}`:''}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={onInfoClick}>個人資訊</MenuItem>
          <MenuItem onClick={onCreateClick}>創造課程</MenuItem>

        </Menu>
        </S.Toolbar>
        
      </AppBar>
    ) 
}

export default Header;