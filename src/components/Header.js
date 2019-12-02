import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import {Button} from '@material-ui/core';

import * as S from './Header.styled'
let Header = ()=>{
    return (
        <AppBar position="static">
        <S.Toolbar>
          <S.Typography variant="h6" >
            DeCourse
          </S.Typography>
          <Button color="inherit">Login</Button>
        </S.Toolbar>
      </AppBar>
    ) 
}

export default Header;