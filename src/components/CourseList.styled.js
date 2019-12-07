
import {Paper as MPaper, Container as MContainer} from '@material-ui/core'
import styled from 'styled-components';

export let Paper = styled(MPaper)`
    padding: 2rem;
    text-align: center;
    color: #efefef;
`

export const Container = styled(MContainer)`
    
    min-height:20rem;
    overflow:hidden;
    position: relative;
    .MuiGrid-container{
        padding: 4rem;
    }
`;

