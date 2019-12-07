import React,{useContext,useState} from 'react'
import {AppContext} from '../context'
import web3 from 'web3'
import {Button,Box,Modal,TextField} from '@material-ui/core';

import * as S from './CustomModal.styled';
import {createCourse,setAddressName} from '../utils/contract'


export default  ({showUserModal,setUserModal})=>{ 
    let {walletAddress} = useContext(AppContext)  
    console.log('walletAddress: ', walletAddress);
    let [userName,setUserName] = useState('')
    let onSetNameSubmit = () => {
        setAddressName({walletAddress,userName},{
                from:walletAddress,
                // value:web3.utils.toWei("1", "ether")
        }).then(res=>{
            console.log('res: ', res);
            
        })
    } 
    return (
        <Modal  aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={showUserModal}
                onClose={()=>setUserModal(false)}>
                    
                    <S.Paper>
                        <S.Box color="text.primary">
                            你的地址 : {walletAddress} 
                        </S.Box>
                        <S.Box color="text.primary">
                            {/* <Typography variant="h5" component="h4">
                                你的地址 : {walletAddress} 
                            </Typography> */}
                            
                        </S.Box>
                        <S.Box color="text.primary">
                            設定暱稱:
                            <TextField fullWidth={true}   
                                        onChange = {value=>{ setUserName(value) }}
                                        variant="outlined" label="" />
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
            </Modal>
    ) 
}