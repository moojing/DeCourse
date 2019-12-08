import React,{useEffect,useContext,useState,useRef} from 'react'; 
import {Grid} from '@material-ui/core'

import {AppContext} from '../context' 
import UserModal from './UserModal'
import CreateModal from './CreateModal'
import CourseModal from './CourseModal'
import * as S from './CourseList.styled' 
import NotFound from './NotFound'
import Loading from './Loading'
import {getCourseState} from '../utils/contract'

export default () => {  
    let {coursesState,
        addCourse,
        resetCourse,
        walletAddress,
        loadCourse,
        loading,
        setLoading,
        courseContract,
        setUserModal,
        showUserModal,
        setCreateModal,
        showCreateModal,
        setCourseModal,
        showCourseModal} = useContext(AppContext) 

    
    let courseInfo = useRef({}) 
    useEffect(()=>{
      
        if(courseContract){
            courseContract.methods.getCourseStates().call()
                .then(res=>{
                    console.log('res: ', res);
                    
                    if(res){
                        loadCourse(res)
                        setLoading(false)
                    }
                    
            }) 
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[courseContract,loading])
    let onCourseClick = (course)=>{
        courseInfo.current = course
        courseInfo.current.hasJoin = checkIfJoinCourse(course)
        
        // getCourseState(courseId).then(res=>{
        //     console.log('res: ', res);
        // })
        setCourseModal(true)
    }
    let checkIfJoinCourse = (course)=>{
        console.log('course: ', course);
        console.log('walletAddress',walletAddress)
       if (walletAddress === course.teacher.toLowerCase()) return true; 
       let res =  course.students.find(student=>walletAddress===student.toLowerCase()) 
       if(res){
        return true
       }else{
           return false
       }
    }
    return (
        <S.Container>
            <Grid container spacing={3}>
                {
                    coursesState.length>0?coursesState.map((course,index)=>{
                        return (
                            <S.CourseGrid item xs={3} key={index}>
                                <S.Paper
                                    hasjoin={checkIfJoinCourse(course).toString()}
                                    onClick={()=>{onCourseClick(course)}}> 
                                    <div className="course--title">
                                        {course.title} 
                                    </div>
                                    <div className="course--info">
                                        <div className="info--teacher">
                                            老師：{
                                                ((course)=>{
                                                    if(course.teacher==='0x0000000000000000000000000000000000000000'){
                                                        return '-'
                                                    }else{
                                                        return course.teacher&&course.teacher.substring(0,5)+'...'
                                                    }
                                                
                                                })(course)
                                            }   
                                        </div>
                                        <div className="info--student">
                                            學生：{`${course.students.filter(student=>student!=='0x0000000000000000000000000000000000000000').length}人`} 
                                        </div>
                                    </div>    
                                </S.Paper>
                                
                            </S.CourseGrid>
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
            <CourseModal
                courseInfo={courseInfo}
                showCourseModal = {showCourseModal}
                setCourseModal ={setCourseModal}/>
    </S.Container>)
};
