import React,{useEffect,useContext} from 'react'; 
import {AppContext} from '../context' 
import {Grid} from '@material-ui/core'

import * as S from './CourseList.styled' 

export default () => {
    let {coursesState} = useContext(AppContext) 
    useEffect(()=>{
        console.log('courseStates',coursesState)
    }) 
    return (
        <S.Container>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <S.Paper> xs=3 </S.Paper>
                </Grid>
                <Grid item xs={3}>
                    <S.Paper> xs=3 </S.Paper>
                </Grid>
                <Grid item xs={3}>
                    <S.Paper > xs=3 </S.Paper>
                </Grid>
                <Grid item xs={3}>
                    <S.Paper > xs=3 </S.Paper>
                </Grid>
                <Grid item xs={3}>
                    <S.Paper > xs=3 </S.Paper>
                </Grid>
            </Grid>
    </S.Container>)
};
