import React,{useState,useContext,useEffect} from 'react'; 
import {AppContext} from '../context'
import * as S from './CustomModal.styled';
import {Typography,Button,Modal,TextField,Select,MenuItem} from '@material-ui/core';
import web3 from 'web3'
import {joinCourse,leaveCourse,getStudentsByCourseId} from '../utils/contract'

let CourseModal =({showCourseModal,setCourseModal,courseInfo})=>{
    console.log('courseInfo: ', courseInfo);
    let {walletAddress,setLoading,setToastSetting} = useContext(AppContext)  
    let [role,setRole] = useState(0) 
    let [tuitionFee,setTuitionFee] = useState(0) 
    // let [validStudents,students] = useState([])
    let onJoinSubmit =()=>{
        joinCourse(courseInfo.current.id,role,{
            from: walletAddress, 
            value:role===0?0:web3.utils.toWei(tuitionFee.toString(), "ether")
        }).then(res=>{
            setCourseModal(false)
            setLoading(true)
            setToastSetting(prev=>({
                ...prev,
                open:true,
                message:'成功加入課程！'
            }))
        })
    }
    let onLeaveSubmit = ()=>{
        leaveCourse(courseInfo.current.id,{
            from: walletAddress, 
        }).then(res=>{
            setCourseModal(false)
            setLoading(true)
            setToastSetting(prev=>({
                ...prev,
                open:true,
                message:'已經離開課程！'
            }))
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
            學費（含保證金）: 最低 1 ether
        </S.Box>
        <S.Box color="text.primary">
            課程內容描述（教學內容）: {courseInfo.current.description}
                     
        </S.Box>
        <S.Box color="text.primary">
            <p>老師： {courseInfo.current.teacher==='0x0000000000000000000000000000000000000000'
                    ?'-':courseInfo.current.teacher}</p>
            <p>學生： {courseInfo.current.students && courseInfo.current.students.map((student,index)=>{
               return(
               <span key={index}> {student==='0x0000000000000000000000000000000000000000'
                    ?'':student} <br/></span>
               ) 
            })}</p>
        </S.Box>

        <S.Box color="text.primary">
            {!courseInfo.current.hasJoin?
            <>
            你想當...
            <Select
                fullWidth={true}   
                labelId="demo-simple-select-disabled-label"
                onChange={(e)=>{setRole(e.target.value)}}
                value={role}
                
            >
                
            <MenuItem value={0}>老師</MenuItem>
            <MenuItem value={1}>學生</MenuItem>

            </Select>
            </>:null}            
        </S.Box>
        {role ===1 ? (<S.Box color="text.primary">
                            你想付多少學費 <small>（包含1%保證金，且必須高於限額）</small>:
                            <TextField fullWidth={true}   
                                        placeholder={tuitionFee}
                                        onChange = {e=>{ setTuitionFee(e.target.value)  }}
                                        variant="outlined" label="" />
                        </S.Box>) : null}
        
        <S.Box color="text.primary">
            {courseInfo.current.hasJoin?
                
                <Button fullWidth size={'medium'} 
                    variant="contained" 
                    color="secondary"
                    onClick={onLeaveSubmit}>
                    離開課程
                </Button>
                : 
                <Button fullWidth size={'medium'} 
                variant="contained" 
                color="primary"
                onClick={onJoinSubmit}>
                    加入課程
                </Button>
            }
            
        </S.Box>
    </S.Paper>
    
    
</Modal>) }

export default CourseModal