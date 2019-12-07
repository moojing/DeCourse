import * as React from 'react'; 
import * as S from './CustomModal.styled';
import {Typography,
    Button,Modal,TextField} from '@material-ui/core';

let CreateModal =({showCreateModal,setCreateModal})=>{
    let onCreateSubmit =()=>{
        
    }

    return   ( 
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showCreateModal}
        onClose={()=>setCreateModal(false)}>
     
    <S.Paper>
         
        <S.Box color="text.primary">
            {/* <Typography variant="h5" component="h4">
                你的地址 : {walletAddress} 
            </Typography> */}
        </S.Box>
        <S.Box color="text.primary">
            設定暱稱:
                    <TextField fullWidth={true}   variant="outlined" label="" />
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