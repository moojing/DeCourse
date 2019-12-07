import React,{useEffect,useContext,useState} from 'react'; 
import {Grid} from '@material-ui/core'

import {AppContext} from '../context' 
import UserModal from './UserModal'
import CreateModal from './CreateModal'
import * as S from './CourseList.styled' 
import NotFound from './NotFound'
import Loading from './Loading'

export default () => {  
    let {coursesState,
        addCourse,
        courseContract,
        setUserModal,
        showUserModal,
        setCreateModal,
        showCreateModal} = useContext(AppContext) 
    let [loading,setLoading] = useState(true)

    useEffect(()=>{
      
        if(courseContract){
            courseContract.methods.getCourseStates().call()
                .then(res=>{
                    console.log('res: ', res);
                    
                    if(res){
                        addCourse(res)
                        setLoading(false)
                    }
                    
            }) 
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[courseContract])
    
    return (
        <S.Container>
            <Grid container spacing={3}>
                {
                    coursesState.length>0?coursesState.map((course,index)=>{
                        return (
                            <Grid item xs={3} key={index}>
                                <S.Paper> {course.title} </S.Paper>
                            </Grid>
                        )
                    }) : <NotFound/>
                }
                
            </Grid>
            <Loading loading={loading}/>
            <UserModal
                showUserModal = {showUserModal}
                setUserModal ={setUserModal}/>
            <CreateModal
                showCreateModal = {showCreateModal}
                setCreateModal ={setCreateModal}/>
    </S.Container>)
};
