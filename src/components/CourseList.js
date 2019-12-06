import React,{useEffect,useContext} from 'react'; 
import {Grid} from '@material-ui/core'

import {AppContext} from '../context' 
import UserModal from './UserModal'
import * as S from './CourseList.styled' 
 

export default () => {
    let {coursesState,
        setUserModal,
        showUserModal} = useContext(AppContext) 
    
    useEffect(()=>{
        console.log('courseStates',coursesState)
        console.log('showUserModal',showUserModal)
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

            <UserModal
                showUserModal = {showUserModal}
                setUserModal ={setUserModal}/>
    </S.Container>)
};
