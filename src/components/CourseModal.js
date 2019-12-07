import React,{useState,useContext,useEffect} from 'react'; 
import {AppContext} from '../context'
import * as S from './CustomModal.styled';
import {Typography,Button,Modal,TextField,Select,MenuItem} from '@material-ui/core';
import web3 from 'web3'
import {joinCourse} from '../utils/contract'

let CourseModal =({showCourseModal,setCourseModal,courseInfo})=>{
    console.log('courseInfo: ', courseInfo);
    let {walletAddress,setLoading} = useContext(AppContext)  
    let [role,setRole] = useState(0) 
    
    let onJoinSubmit =()=>{
        joinCourse(courseInfo.current.id,role,{
            from: walletAddress, 
            value:web3.utils.toWei("1", "ether")
        }).then(res=>{
            console.log('JOINres: ', res);
            setCourseModal(false)
            setLoading(true)
        })
    }

    return   ( 
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showCourseModal}
        onClose={()=>setCourseModal(false)}>
     
    <S.Paper>
         
        <S.Box color="text.primary">
            <Typography variant="h5" component="h4">
                課程資訊 : 
            </Typography>
        </S.Box>
        <S.Box color="text.primary">
            課程名稱: {courseInfo.current.title}
        </S.Box>
        <S.Box color="text.primary">
            課程內容描述（教學內容）: {courseInfo.current.description}
                     
        </S.Box>
        <S.Box color="text.primary">
            <p>老師： {courseInfo.current.teacher}</p>
            <p>學生： {courseInfo.current.students && courseInfo.current.students.map(student=>{
               return(
               <span> {student} 、</span>
               ) 
            })}</p>
        </S.Box>

        <S.Box color="text.primary">
            你想當...
            <Select
                fullWidth={true}   
                labelId="demo-simple-select-disabled-label"
                onChange={(e)=>{setRole(e.target.value)}}
                value={role}
            
            >
                
            <MenuItem value={0}>Teacher</MenuItem>
            <MenuItem value={1}>Student</MenuItem>

            </Select>
        </S.Box>
        <S.Box color="text.primary">
            <Button fullWidth size={'medium'} 
                    variant="contained" 
                    color="primary"
                    onClick={onJoinSubmit}>
               加入課程
            </Button>
        </S.Box>
    </S.Paper>
    
    
</Modal>) }

export default CourseModal