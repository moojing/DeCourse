import React,{useContext} from 'react'
import {AppContext} from '../context'

import {Typography,
        Button,Box,Modal,TextField} from '@material-ui/core';

import * as S from './CustomModal.styled';



export default  ({showUserModal,setUserModal})=>{ 
    // let {walletAddress} = useContext(AppContext)    
    let onSetNameSubmit = () => {
        
    } 
    return (
        <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={showUserModal}
                onClose={()=>setUserModal(false)}
            >
                <div>
                <S.Paper>
                    <S.Box color="text.primary">
                        {/* <Typography variant="h5" component="h4">
                            你的地址 : {walletAddress} 
                        </Typography> */}
                        設定暱稱
                    </S.Box>
                    <S.Box color="text.primary">
                        <Typography component="p">
                                <TextField fullWidth={true}   variant="outlined" label="" />
                        </Typography>
                    </S.Box>
                    <S.Box color="text.primary">
                        <Button fullWidth size={'medium'} 
                                variant="contained" 
                                color="primary"
                                onClick={onSetNameSubmit}>
                           送出
                        </Button>
                    </S.Box>
                </S.Paper>
                
                </div>
            </Modal>
    ) 
}