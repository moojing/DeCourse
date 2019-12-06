import styled from 'styled-components';
import  MPaper from '@material-ui/core/Paper';
import Mbox from '@material-ui/core/Box';

export const Paper = styled(MPaper)`
    padding: 3rem; 
    width: 60%;
    display: inline-block;
    position: fixed;
    left: 50%; 
    top: 50%;
    transform:translate(-50%,-50%); 
    &:focus{
        outline: none;
    }
`;

export const Box = styled(Mbox)`
    &:first-child{
        margin-top: 0;
    }
    margin:2rem 0;
    margin-bottom: 0;
`;




