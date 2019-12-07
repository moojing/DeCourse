import React,{useState,useContext} from 'react'; 
import {AppContext} from '../context'
import * as S from './CustomModal.styled';
import {Select,MenuItem,Typography,Button,Modal,TextField} from '@material-ui/core';
import web3 from 'web3'
import {createCourse} from '../utils/contract'

let CreateModal =({showCreateModal,setCreateModal})=>{
    let {walletAddress} = useContext(AppContext)  
    let [courseTitle,setCourseTitle] = useState() 
    let [courseDescription,setCourseDescription] = useState() 
    let [role,setRole] = useState(0) 
    
    let onCreateSubmit =()=>{
        let courseInfo = {
            title:courseTitle,
            description:courseDescription,
            role}
        createCourse(courseInfo,{
            from:walletAddress,
            value:web3.utils.toWei("1", "ether")
        }).then(res=>{
            setCreateModal(false)
            
        })
    }

    return   ( 
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showCreateModal}
        onClose={()=>setCreateModal(false)}>
     
    <S.Paper>
         
        <S.Box color="text.primary">
            <Typography variant="h5" component="h4">
                創造課程 : 
            </Typography>
        </S.Box>
        <S.Box color="text.primary">
            課程名稱:
                    <TextField 
                        fullWidth={true}   
                        variant="outlined" 
                        label="" 
                        onChange={(e)=>{setCourseTitle(e.target.value)}} />
        </S.Box>
        <S.Box color="text.primary">
            課程內容描述（教學內容）:
                    <TextField 
                        fullWidth={true}   
                        variant="outlined" 
                        label="" 
                        onChange={(e)=>{setCourseDescription(e.target.value)} } />
        </S.Box>
        <S.Box color="text.primary">
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
                    {/* <TextField fullWidth={true}   variant="outlined" label="" /> */}
        </S.Box>
        <S.Box color="text.primary">
            <Button fullWidth size={'medium'} 
                    variant="contained" 
                    color="primary"
                    onClick={onCreateSubmit}>
               送出
            </Button>
        </S.Box>
    </S.Paper>
    
    
</Modal>) }

export default CreateModal