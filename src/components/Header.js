import React,{useContext, useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar';
import {Button,Menu,MenuItem} from '@material-ui/core';

import {createCourse,getCourses,getContract} from '../utils/contract'
import * as S from './Header.styled'
import {AppContext} from '../context/index'


let Header = ()=>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {walletAddress,courseContract}  = useContext(AppContext)
  
  useEffect(()=>{
    if(courseContract){
      console.log('courseContract: ', courseContract);
   
    }
    
   
  },[courseContract])

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const onCreateCourse =async ()=>{
    let courseData = {
      title: 'BlockChain 101', 
      description:"let's learn blockchain!!",
      role:1
    }
    await createCourse(courseData,{from:walletAddress})
   
    // let courses = await getCourses()
   

  }
  
    return (
        <AppBar position="static">
        <S.Toolbar>
          <S.Typography variant="h6" >
            DeCourse
          </S.Typography>
          <Button 
            onClick={onCreateCourse}
            color="inherit">
            創建課程
        </Button>
        <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClick}
            color="inherit">
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
        </S.Toolbar>
        
      </AppBar>
    ) 
}

export default Header;