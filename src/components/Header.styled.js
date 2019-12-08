
import styled from 'styled-components';
import MToolbar from '@material-ui/core/Toolbar';
import MTypography from '@material-ui/core/Typography';


 let Toolbar = styled(MToolbar)`
 
  
`;


let Typography  = styled(MTypography)`
    flex-grow:1;  
    display: flex;
    align-items:center;
    img{
        max-width: 40px;
        margin: 0 10px;
    }
`; 




export{Toolbar,Typography}
