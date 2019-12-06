import React,{useEffect,useContext,useCallback} from 'react'; 
import {Grid} from '@material-ui/core'

import {AppContext} from '../context' 
import UserModal from './UserModal'
import * as S from './CourseList.styled' 
 

export default () => {
    let {coursesState,
        addCourse,
        courseContract,
        setUserModal,
        showUserModal} = useContext(AppContext) 
      
    useEffect(()=>{
        if(courseContract){
            courseContract.methods.getCourseStates().call()
                .then(res=>{
                    addCourse(res)
            }) 
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[courseContract])
    

    console.log('coursesState: ', coursesState);
    return (
        <S.Container>
            <Grid container spacing={3}>
                {coursesState.courses.map((course,index)=>{
                    return (
                        <Grid item xs={3} key={index}>
                            <S.Paper> {course[0].title} </S.Paper>
                        </Grid>
                    )
                })}
                
             
            </Grid>

            <UserModal
                showUserModal = {showUserModal}
                setUserModal ={setUserModal}/>
    </S.Container>)
};
