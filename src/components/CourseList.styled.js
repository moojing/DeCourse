
import {Paper as MPaper, 
       Container as MContainer,
       Grid as MGrid} from '@material-ui/core'
import styled from 'styled-components';

export let Paper = styled(MPaper)`
    border: ${props => props.hasjoin==="true" ? "2px #ffd221 solid" : "none"};
    padding: 2rem;
    text-align: center;
    color: #efefef;
    &:before{
        display: ${props => props.hasjoin=== "true" ? "inline-block" : "none"};
        content:'You are in.';
        position: absolute; 
        top: -5px;
        left: 50%;
        transform:translateX(-50%);
        color:#ffd221;
    }
`

export const CourseGrid = styled(MGrid)`
   
    position: relative;
    .MuiPaper-root{
        
        cursor: pointer;
        padding: 18px 1rem;
        padding-bottom: 10px;
        &:hover{
            
            background-color: #3f51b5;
            color:white !important;
            .course--info{
                color:white !important;
            }
        }
    }
    .course--title{
        min-height: 5rem;
        display: flex; 
        align-items:center; 
        justify-content:center;
        font-size: 22px;
    }
    .course--info{
            display: flex;
            justify-content:space-between;
            margin: 0 ;
            margin-top: 5px;
            color:#afafaf;
            .info-teacher{}
            .info-student{
                
            }
    }
`;

export const Container = styled(MContainer)`
    
    min-height:20rem;
    overflow:hidden;
    position: relative;
    .MuiGrid-container{
        padding: 4rem;
    }
`;

