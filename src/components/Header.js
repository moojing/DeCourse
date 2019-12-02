import React from 'react'

import AppBar from '@material-ui/core/AppBar';
// import {Toolbar} from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button} from '@material-ui/core';

import * as S from './Header.styled'
let Header = ()=>{
    return (
        <AppBar position="static">
        <S.Toolbar>
          <Typography variant="h6" >
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </S.Toolbar>
      </AppBar>
    ) 
}

export default Header;