import React,{useEffect,useContext,useCallback} from 'react'; 
import {Grid} from '@material-ui/core'

import {AppContext} from '../context' 
import UserModal from './UserModal'
import CreateModal from './CreateModal'
import * as S from './CourseList.styled' 
 

export default () => {
    let {coursesState,
        addCourse,
        courseContract,
        setUserModal,
        showUserModal,
        setCreateModal,
        showCreateModal} = useContext(AppContext) 
      
    useEffect(()=>{
      
        if(courseContract){
            courseContract.methods.getCourseStates().call()
                .then(res=>{
                    console.log('res: ', res);
                    if(res){
                        addCourse(res)
                    }
                   
                    
            }) 
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[courseContract])
    
    return (
        <S.Container>
            <Grid container spacing={3}>
                {coursesState.map((course,index)=>{
                    return (
                        <Grid item xs={3} key={index}>
                            <S.Paper> {course.title} </S.Paper>
                        </Grid>
                    )
                })}
                
             
            </Grid>

            <UserModal
                showUserModal = {showUserModal}
                setUserModal ={setUserModal}/>
            <CreateModal
                showCreateModal = {showCreateModal}
                setCreateModal ={setCreateModal}/>
    </S.Container>)
};
